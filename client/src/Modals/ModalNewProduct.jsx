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
import { AiOutlinePercentage } from 'react-icons/ai';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { useCreateProductMutation } from '../redux/apis/productsApi';
import { productSchema, initialValues } from '../validationSchemas/productSchema';
import { showError, showSuccess } from '../utils/notifications';

const ModalNewProduct = ({ opened, setOpened, providers }) => {
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
            showNotification(showSuccess('Producto guardado con éxito'));
          } catch (error) {
            showNotification(showError('No se pudo guardar el producto'));
          }
        })}>
        <TextInput
          withAsterisk
          mb={10}
          label='Descripción'
          data-autofocus
          description='del producto'
          {...FormProduct.getInputProps('description')}
        />
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              mb={10}
              label='Código de barras'
              description='que se encuentra en el producto'
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
              icon={<MdOutlineAttachMoney size={17} color='black' />}
              description='del producto'
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
              icon={<AiOutlinePercentage size={17} color='black' />}
              description='de ganancia para éste producto'
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
              description='de venta del producto'
              hideControls
              withAsterisk
              mb={10}
              icon={<MdOutlineAttachMoney size={17} color='black' />}
              {...FormProduct.getInputProps('price')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label='Stock'
              description='del producto'
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

export default ModalNewProduct;
