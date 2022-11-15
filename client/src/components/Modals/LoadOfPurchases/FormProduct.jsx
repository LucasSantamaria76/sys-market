import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { initialValuesProductPurchase, purchasesSchema } from '../../../validationSchemas/purchasesSchema';
import { useDispatch, useSelector } from 'react-redux';
import { addProductPurchase, resetPurchase, setCashPayment } from '../../../redux/slices/purchasesSlice';
import { showNotification } from '@mantine/notifications';
import { useGetProductsOfProviderQuery } from '../../../redux/apis/productsApi';
import { showError, showSuccess } from '../../../utils/notifications';
import { fetchCreate } from '../../../functions/functionAPI';

export const FormProduct = ({ providerID, setOpened }) => {
  const [prodsSel, setProdsSel] = useState([]);
  const {
    purchase: { cashPayment, provider, products, total },
  } = useSelector((state) => state.purchase);
  const {
    user: { token },
  } = useSelector((state) => state.auth);
  const {
    data: { listProducts },
  } = useGetProductsOfProviderQuery(providerID);
  const dispatch = useDispatch();
  const barcodeRef = useRef(null);
  const theme = useMantineTheme();

  const FormPurchase = useForm({
    initialValues: initialValuesProductPurchase,
    validate: zodResolver(purchasesSchema),
  });

  useEffect(() => {
    setProdsSel(
      listProducts.reduce((acc, item) => {
        return (acc = [
          ...acc,
          {
            value: item.barcode,
            label: item.description,
            image: item.photoURL,
          },
        ]);
      }, [])
    );
  }, [listProducts]);

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

  const handlePurchase = async () => {
    try {
      const body = {
        total,
        paid_purchase: cashPayment,
        providerId: provider,
        products,
      };
      if (!products?.length) {
        showNotification(showError('No hay productos cargados'));
        return;
      }
      const res = await fetchCreate('/purchases', token, body);
      if (res.success) {
        showNotification(showSuccess('Pedido cargado con éxito'));
        dispatch(resetPurchase());
        setOpened(false);
      } else showNotification(showError('Error al cargar el pedido'));
    } catch (error) {
      showNotification(showError(error));
    }
  };

  return (
    <>
      <form
        onSubmit={FormPurchase.onSubmit(async (values) => {
          const productExist = listProducts.find((prod) => prod.barcode === values.barcode);

          if (productExist) {
            dispatch(addProductPurchase(FormPurchase.values));
            FormPurchase.reset();
          } else showNotification(showError('Producto inexistente'));

          barcodeRef.current.focus();
        })}>
        <TextInput
          ref={barcodeRef}
          label='Código'
          data-autofocus
          sx={{ width: '155px' }}
          withAsterisk
          {...FormPurchase.getInputProps('barcode')}
          rightSection={
            <Tooltip
              label='Borrar código'
              position='top-center'
              color={theme.colors.brand[0]}
              withArrow
              hidden={!FormPurchase.values.barcode}>
              <Box mt={5} hidden={!FormPurchase.values.barcode} sx={{ cursor: 'pointer' }}>
                <GrFormClose
                  size={15}
                  onClick={() => {
                    FormPurchase.setFieldValue('barcode', '');
                    barcodeRef.current.focus();
                  }}
                />
              </Box>
            </Tooltip>
          }
        />
        {!!prodsSel?.length && (
          <Select
            itemComponent={SelectItem}
            data={prodsSel}
            label='Selecciona el producto'
            searchable
            {...FormPurchase.getInputProps('barcode')}
          />
        )}
        <Group>
          <NumberInput
            label='Costo'
            withAsterisk
            description='del producto'
            {...FormPurchase.getInputProps('cost')}
            hideControls
            precision={2}
            decimalSeparator='.'
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ '
            }
          />
          <NumberInput
            label='Cantidad'
            sx={{ width: '180px' }}
            description='comprada del producto'
            {...FormPurchase.getInputProps('quantity')}
            withAsterisk
            hideControls
          />
          <NumberInput
            label='Procentaje'
            sx={{ width: '180px' }}
            withAsterisk
            description='de ganancia'
            {...FormPurchase.getInputProps('benefit')}
            hideControls
          />
          <Checkbox
            label='Pago en efectivo'
            sx={{ alignSelf: 'self-end' }}
            ml={30}
            checked={cashPayment}
            onChange={(e) => dispatch(setCashPayment(e.currentTarget.checked))}
          />
        </Group>
        <Grid justify={'space-between'} align='flex-end' mt={10}>
          <Text size='xs' color={'pink'}>
            * Campos requeridos
          </Text>
          <Grid justify={'center'} m={10}>
            <Button type='button' mt={5} color='pink' mr={10} onClick={() => setOpened(false)}>
              Salir
            </Button>
            <Button type='submit' variant='light' mt={5} mr={10}>
              Agregar
            </Button>
            <Button mt={5} onClick={handlePurchase}>
              Cerrar y guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
