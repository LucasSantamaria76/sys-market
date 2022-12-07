import {
  Avatar,
  Box,
  Button,
  Group,
  MediaQuery,
  Modal,
  Select,
  Text,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery, useUpdateStockMutation } from '../../redux/apis/productsApi';
import { GrFormClose } from 'react-icons/gr';
import { addItem, clearSale } from '../../redux/slices/saleSlice';
import { showNotification } from '@mantine/notifications';
import { Summary } from './components/Summary';
import { useCreateSaleMutation } from '../../redux/apis/salesApi';
import { openConfirmModal } from '@mantine/modals';
import { PAYMENT_METHODS_STRING } from '../../constants/constants';
import { useDisclosure } from '@mantine/hooks';
import { SalesOfTheDay } from './components/SalesOfTheDay';
import { formatPrice } from './../../utils/formatPrice';
import { DataTableSale } from '../../components';
import { notification, showError, showSuccess } from './../../utils/notifications';
import { SalesData } from './components/SalesData';

export const Sales = () => {
  const barcodeRef = useRef(null);
  const quantityRef = useRef(null);
  const { item, items } = useSelector((state) => state.sale);
  const [values, setValues] = useState(item);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState({ quantity: 0, total: 0 });
  const { data } = useGetProductsQuery();
  const [createSale, { isLoading }] = useCreateSaleMutation();
  const [updateStock] = useUpdateStockMutation();
  const theme = useMantineTheme();
  const [opened, { close, open }] = useDisclosure(false);

  useEffect(() => {
    const orderNadSaveProducts = async () => {
      const orderedProducts = await data?.products
        .map((item) => item)
        .sort((a, b) => a['description'].toLowerCase().localeCompare(b['description'].toLowerCase()));

      setProducts(
        orderedProducts?.reduce((acc, item) => {
          return (acc = [
            ...acc,
            {
              value: item.description,
              label: item.description,
              image: item.photoURL,
            },
          ]);
        }, [])
      );
    };
    orderNadSaveProducts();
  }, [data?.products]);

  useEffect(() => {
    setSummary({
      quantity: items?.reduce((acc, item) => acc + Number(item.quantity), 0),
      total: items?.reduce((acc, item) => acc + Number(item.subTotal), 0),
    });
  }, [items]);

  const SelectItem = forwardRef(({ image, label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size='sm'>{label}</Text>
        </div>
      </Group>
    </div>
  ));

  const handleChange = (event) => {
    if (event.target?.name === 'quantity' && !/^\d*$/.test(event.target?.value)) return;

    if (typeof event === 'string') {
      const prod = data?.products?.find((item) => item.description === event);
      setValues({
        ...values,
        barcode: prod?.barcode,
        description: event,
      });
    } else
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
  };

  const addProduct = () => {
    if (!!values.barcode) {
      const { barcode, description, price, photoURL } = data?.products?.find((item) => item.barcode === values.barcode);
      if (!!barcode) {
        const product = {
          barcode,
          description,
          price,
          photoURL,
          quantity: values.quantity,
          subTotal: +price * values.quantity,
        };
        dispatch(addItem(product));
        setValues(item);
        barcodeRef.current?.focus();
      } else showNotification(notification('Producto no encontrado'));
    }
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    e.ctrlKey && e.preventDefault();
    if (['ArrowUp', 'ArrowDown'].includes(e.key) || (e.ctrlKey && /^\d*$/.test(e.key))) {
      let num;
      switch (e.key) {
        case 'ArrowUp':
          num = values.quantity + 1;
          break;
        case 'ArrowDown':
          num = values.quantity > 1 ? values.quantity - 1 : 1;
          break;
        default:
          num = e.key;
          break;
      }
      setValues({
        ...values,
        quantity: num,
      });
    }
    if (e.key === 'Enter') {
      const prod = data?.products?.find(
        (item) => item.barcode === e.target.value || item.description === e.target.value
      );
      if (!!prod) {
        setValues({
          ...values,
          barcode: prod?.barcode,
          description: prod?.description,
        });
        !!values.quantity && addProduct();
      } else {
        e.target.ariaAutoComplete !== 'list' && showNotification(notification('Producto no encontrado'));
        barcodeRef.current?.focus();
      }
    }
  };

  const handleTableClick = () => barcodeRef.current?.focus();

  const addSale = (paymentMethod) => {
    items.length &&
      openConfirmModal({
        title: (
          <Title color={theme.primaryColor} order={2}>
            Está seguro de cerrar la venta
          </Title>
        ),
        centered: true,
        children: (
          <SalesData total={formatPrice(summary.total)} paymentMethod={PAYMENT_METHODS_STRING[paymentMethod]} />
        ),
        labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
        onConfirm: async () => {
          try {
            const sale = {
              total: summary.total,
              paymentMethod,
              items: await items?.map(({ barcode, price, quantity }) => ({
                barcode,
                price,
                quantity,
              })),
            };
            await createSale(sale).unwrap();
            await items?.forEach(
              async ({ barcode, quantity }) => await updateStock({ barcode, quantity, isReduce: true })
            );
            dispatch(clearSale());
            showNotification(showSuccess('Venta realizada con éxito'));
          } catch (err) {
            const errMsg = err?.error || err.data?.error;
            showNotification(showError('No se pudo realizar la venta', 'Error: ' + errMsg));
          }
        },
      });
  };

  return (
    <>
      <Box sx={{ width: '100%', height: '100vh', padding: '10px' }} onClick={handleTableClick}>
        <Group my={10}>
          <TextInput
            ref={barcodeRef}
            label='Código'
            name='barcode'
            value={values.barcode}
            onChange={handleChange}
            sx={{ width: '155px' }}
            onKeyDown={(e) => handleKeyDown(e)}
            rightSection={
              <Tooltip
                label='Borrar código'
                position='top-center'
                color={theme.colors.brand[0]}
                withArrow
                hidden={!values.barcode}>
                <Box mt={5} hidden={!values.barcode} sx={{ cursor: 'pointer' }}>
                  <GrFormClose
                    size={15}
                    onClick={() => {
                      setValues(item);
                      barcodeRef.current.focus();
                    }}
                  />
                </Box>
              </Tooltip>
            }
          />
          <TextInput
            ref={quantityRef}
            name='quantity'
            pattern={/^\D*\d$/}
            value={values.quantity}
            onChange={handleChange}
            label='Cantidad'
            sx={{ width: '70px' }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Enter' && barcodeRef.current.focus()}
          />
          {!!products?.length && (
            <Select
              value={values.description}
              onChange={handleChange}
              itemComponent={SelectItem}
              data={products}
              label='Selecciona el producto'
              searchable
              nothingFound='No options'
              maxDropdownHeight={350}
              sx={{ width: '450px' }}
              onKeyDown={(e) => handleKeyDown(e)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <Button variant='light' mr={10} sx={{ width: '100px', alignSelf: 'flex-end' }} onClick={addProduct}>
            Agregar
          </Button>
          <Button variant='light' mr={10} sx={{ width: '130px', alignSelf: 'flex-end' }} onClick={open}>
            Ventas del día
          </Button>
        </Group>
        <MediaQuery query='(max-width: 778px)' styles={{ height: '50vh' }}>
          <Box sx={{ height: '65vh', border: '1px solid #ccc' }}>
            <DataTableSale records={items} onClick={handleTableClick} />
          </Box>
        </MediaQuery>
        <Summary summary={summary} onClick={handleTableClick} addSale={addSale} loading={isLoading} />
        <Modal
          opened={opened}
          onClose={close}
          title={
            <Text size='2rem' style={{ width: '96vw', textAlign: 'center' }} weight={700} color={theme.colors.brand[4]}>
              Ventas del día
            </Text>
          }
          fullScreen>
          <SalesOfTheDay />
        </Modal>
      </Box>
    </>
  );
};
