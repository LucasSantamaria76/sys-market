import {
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { GrFormClose } from 'react-icons/gr';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useGetProductsQuery } from '../../../redux/apis/productsApi';
import { initialValuesOrder, orderSchema } from '../../../validationSchemas/orderSchema';

export const LoadOrder = ({ providerID, opened, setOpened, refetch }) => {
  const theme = useMantineTheme();
  const [products, setProducts] = useState([]);
  const { data } = useGetProductsQuery();
  const barcodeRef = useRef(null);

  useEffect(() => {
    setProducts(
      data?.products?.reduce((acc, item) => {
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
  }, [data?.products]);

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

  const FormOrder = useForm({
    initialValues: initialValuesOrder,
    validate: zodResolver(orderSchema),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Text color='brand' size='xl'>
          Cargar pedido
        </Text>
      }
      size={'lg'}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      shadow={'2px 2px 10px rgba(0,0,0,0.75)'}
      centered>
      <form
        onSubmit={FormOrder.onSubmit(async (values) => {
          const data = { ...values, id: providerID };

          /*           await addProductToProvider(data).unwrap();
          if (!error) {
            FormOrder.reset();
            refetch();
            setOpened(false);
            showNotification({
              title: 'Producto asociado con éxito',
            });
          } else {
            showNotification({
              title: 'No se pudo asociar el producto',
              color: 'red',
              icon: <GrFormClose />,
            });
          } */
        })}>
        <TextInput
          ref={barcodeRef}
          label='Código'
          data-autofocus
          sx={{ width: '155px' }}
          withAsterisk
          {...FormOrder.getInputProps('barcode')}
          rightSection={
            <Tooltip
              label='Borrar código'
              position='top-center'
              color={theme.colors.brand[0]}
              withArrow
              hidden={!FormOrder.values.barcode}>
              <Box mt={5} hidden={!FormOrder.values.barcode} sx={{ cursor: 'pointer' }}>
                <GrFormClose
                  size={15}
                  onClick={() => {
                    FormOrder.setFieldValue('barcode', '');
                    barcodeRef.current.focus();
                  }}
                />
              </Box>
            </Tooltip>
          }
        />
        {!!products?.length && (
          <Select
            itemComponent={SelectItem}
            data={products}
            label='Selecciona el producto'
            searchable
            {...FormOrder.getInputProps('barcode')}
          />
        )}
        <Group>
          <NumberInput
            label='Costo'
            withAsterisk
            description='del producto'
            {...FormOrder.getInputProps('cost')}
            hideControls
          />
          <NumberInput
            label='Cantidad'
            sx={{ width: '180px' }}
            description='comprada del producto'
            {...FormOrder.getInputProps('quantity')}
            hideControls
          />
          <NumberInput
            label='Procentaje'
            sx={{ width: '180px' }}
            withAsterisk
            description='de ganancia'
            {...FormOrder.getInputProps('benefit')}
            hideControls
          />
        </Group>
        <Grid justify={'space-between'} align='flex-end' mt={10}>
          <Text size='xs' color={'pink'}>
            * Campos requeridos
          </Text>
          <Grid justify={'flex-end'} m={10}>
            <Button type='button' color='pink' mr={10} onClick={() => setOpened(false)}>
              Salir
            </Button>
            <Button type='submit' variant='light' /* loading={isLoading} */>
              {/* {isLoading ? 'guardando...' : 'Guardar producto'} */}
              Guardar producto
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};
