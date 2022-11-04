import {
  Button,
  Center,
  Grid,
  Image,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useCreateProductMutation } from '../../../redux/apis/productsApi';
import { productSchema, initialValues } from '../../../validationSchemas/productSchema';

export const NewProduct = ({ opened, setOpened, providers }) => {
  const theme = useMantineTheme();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const FormProduct = useForm({
    initialValues,
    initialDirty: { benefit: true },
    validate: zodResolver(productSchema),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title='Nuevo Producto'
      size={'xl'}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      shadow={'2px 2px 10px rgba(0,0,0,0.75)'}
      centered>
      <form
        onSubmit={FormProduct.onSubmit(async (values) => {
          try {
            await createProduct(values).unwrap();
            FormProduct.reset();
            setOpened(false);
            showNotification({
              title: 'Producto guardado con éxito',
              color: 'teal',
            });
          } catch (error) {
            showNotification({
              title: 'No se pudo guardar el producto',
              message: 'Error: ' + error.data.error,
              color: 'red',
            });
          }
        })}>
        <TextInput
          withAsterisk
          mb={10}
          label='Descripción'
          data-autofocus
          description='Ingrese la descripción del producto'
          {...FormProduct.getInputProps('description')}
        />
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              mb={10}
              label='Código de barras'
              description='Ingrese el código de barras que se encuentra en el producto'
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              {...FormProduct.getInputProps('barcode')}
              onBlur={() => {
                FormProduct.values.barcode &&
                  FormProduct.setFieldValue(
                    'photoURL',
                    `https://imagenes.preciosclaros.gob.ar/productos/${FormProduct.values.barcode}.jpg`
                  );
              }}
            />
            <NumberInput
              withAsterisk
              mb={10}
              label='Costo'
              hideControls
              description='Ingrese el precio de costo del producto'
              {...FormProduct.getInputProps('cost')}
              onBlur={() => {
                FormProduct.setFieldValue(
                  'price',
                  FormProduct.values.cost + FormProduct.values.cost * (FormProduct.values.benefit / 100)
                );
              }}
            />
            <NumberInput
              withAsterisk
              mb={10}
              label='Porcentaje'
              description='Ingrese el porcentaje de ganancia para éste producto'
              hideControls
              {...FormProduct.getInputProps('benefit')}
              onBlur={() => {
                FormProduct.setFieldValue(
                  'price',
                  FormProduct.values.cost + FormProduct.values.cost * (FormProduct.values.benefit / 100)
                );
              }}
            />
          </Grid.Col>
          <Grid.Col span={6} mt={5}>
            <Center>
              <Image
                height={250}
                src={FormProduct.values.photoURL}
                alt='With default placeholder'
                withPlaceholder
                fit='contain'
              />
            </Center>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <NumberInput
              label='Precio'
              description='Ingrese el precio del producto'
              hideControls
              withAsterisk
              mb={10}
              {...FormProduct.getInputProps('price')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label='Stock'
              description='Ingrese el stock del producto'
              hideControls
              mb={10}
              {...FormProduct.getInputProps('stock')}
            />
          </Grid.Col>
        </Grid>
        <Select
          data={providers}
          label='Selecciona el proveedor'
          withAsterisk
          searchable
          clearable
          nothingFound='No options'
          maxDropdownHeight={200}
          {...FormProduct.getInputProps('providerID')}
        />

        <TextInput
          mb={10}
          label='Foto'
          description='Ingrese la url de la imagen del producto'
          {...FormProduct.getInputProps('photoURL')}
        />

        <Grid justify={'space-between'} align='flex-end'>
          <Text size='xs' color={'pink'}>
            * Campos requeridos
          </Text>
          <Grid justify={'flex-end'} m={10}>
            <Button type='button' color='pink' mr={10} onClick={() => setOpened(false)}>
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
