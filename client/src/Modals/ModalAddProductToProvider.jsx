import { Avatar, Button, Grid, Group, Modal, NumberInput, Select, Text, useMantineTheme } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { forwardRef, useEffect, useState } from 'react';
import { useGetProductsQuery } from '../redux/apis/productsApi';
import { useAddProductToProviderMutation } from '../redux/apis/providers';
import { initialValuesAddProduct, providerSchemaAddProduct } from '../validationSchemas/providerSchema';
import { showError, showSuccess } from '../utils/notifications';

const ModalAddProductToProvider = ({ providerID, opened, setOpened, refetch }) => {
  const theme = useMantineTheme();
  const [products, setProducts] = useState([]);
  const { data } = useGetProductsQuery();
  const [addProductToProvider, { isLoading, isError }] = useAddProductToProviderMutation();

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

  const FormAddProductToProvider = useForm({
    initialValues: initialValuesAddProduct,
    validate: zodResolver(providerSchemaAddProduct),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Text color='brand' size='xl'>
          Asociar producto
        </Text>
      }
      size={'md'}
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      shadow={'2px 2px 10px rgba(0,0,0,0.75)'}
      centered>
      <form
        onSubmit={FormAddProductToProvider.onSubmit(async (values) => {
          const data = { ...values, id: providerID };

          await addProductToProvider(data).unwrap();
          if (isError) {
            showNotification(showError('No se pudo asociar el producto'));
          } else {
            FormAddProductToProvider.reset();
            refetch();
            setOpened(false);
            showNotification(showSuccess('Producto asociado con éxito'));
          }
        })}>
        {!!products?.length && (
          <Select
            itemComponent={SelectItem}
            data={products}
            label='Selecciona el producto'
            withAsterisk
            searchable
            clearable
            {...FormAddProductToProvider.getInputProps('barcode')}
          />
        )}
        <NumberInput
          label='Costo'
          description='Ingrese precio de costo del producto'
          {...FormAddProductToProvider.getInputProps('cost')}
          hideControls
        />
        <Grid justify={'space-between'} align='flex-end' mt={10}>
          <Text size='xs' color={'pink'}>
            * Campos requeridos
          </Text>
          <Grid justify={'flex-end'} m={10}>
            <Button type='button' color='pink' mr={10} mb={5} onClick={() => setOpened(false)}>
              Cancelar
            </Button>
            <Button type='submit' variant='light' loading={isLoading}>
              {isLoading ? 'guardando...' : 'Guardar producto'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};
export default ModalAddProductToProvider;
