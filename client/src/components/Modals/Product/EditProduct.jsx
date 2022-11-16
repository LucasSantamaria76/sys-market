import { Button, Grid, Modal, NumberInput, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useUpdateProductMutation } from '../../../redux/apis/productsApi';
import { showError, showSuccess } from '../../../utils/notifications';
import { productEditSchema } from './../../../validationSchemas/productSchema';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { AiOutlinePercentage } from 'react-icons/ai';

export const EditProduct = ({
  opened,
  setOpened,
  product: { barcode, description, price, stock, benefit, cost, photoURL },
}) => {
  const theme = useMantineTheme();
  const [updateProduct, { isLoading, error }] = useUpdateProductMutation();

  const FormEditProduct = useForm({
    initialValues: { barcode, description, price: +price, stock: +stock, benefit: +benefit, cost: +cost, photoURL },
    initialDirty: { benefit: true },
    validate: zodResolver(productEditSchema),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Editar Producto - ${barcode} `}
      size={'lg'}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      shadow={'2px 2px 10px rgba(0,0,0,0.75)'}
      centered>
      <form
        onSubmit={FormEditProduct.onSubmit(async (values) => {
          await updateProduct(values).unwrap();
          if (!error) {
            FormEditProduct.reset();
            setOpened(false);
            showNotification(showSuccess('Producto modificado con éxito'));
          } else {
            console.log();
            showNotification(showError('No se pudo guardar el producto'));
          }
        })}>
        <TextInput
          withAsterisk
          data-autofocus
          mb={10}
          label='Descripción'
          description='Ingrese la descripción del producto'
          {...FormEditProduct.getInputProps('description')}
        />
        <Grid justify={'space-between'}>
          <Grid.Col span={6}>
            <NumberInput
              withAsterisk
              hideControls
              mb={10}
              label='Costo'
              description='Ingrese el precio de costo del producto'
              icon={<MdOutlineAttachMoney size={17} color='black' />}
              {...FormEditProduct.getInputProps('cost')}
              onBlur={() => {
                FormEditProduct.setFieldValue(
                  'price',
                  FormEditProduct.values.cost + FormEditProduct.values.cost * (FormEditProduct.values.benefit / 100)
                );
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              withAsterisk
              hideControls
              mb={10}
              label='Porcentaje'
              icon={<AiOutlinePercentage size={17} color='black' />}
              description='Ingrese el porcentaje de ganancia para éste producto'
              {...FormEditProduct.getInputProps('benefit')}
              onBlur={() => {
                FormEditProduct.setFieldValue(
                  'price',
                  FormEditProduct.values.cost + FormEditProduct.values.cost * (FormEditProduct.values.benefit / 100)
                );
              }}
            />
          </Grid.Col>
        </Grid>
        <Grid justify={'space-between'}>
          <Grid.Col span={6}>
            <NumberInput
              withAsterisk
              hideControls
              mb={10}
              label='Precio'
              icon={<MdOutlineAttachMoney size={17} color='black' />}
              description='Ingrese el precio del producto'
              {...FormEditProduct.getInputProps('price')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              withAsterisk
              hideControls
              mb={10}
              label='Stock'
              description='Ingrese el stock del producto'
              {...FormEditProduct.getInputProps('stock')}
            />
          </Grid.Col>
        </Grid>
        <TextInput
          mb={10}
          label='Foto'
          description='Ingrese la url de la imagen del producto'
          {...FormEditProduct.getInputProps('photoURL')}
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
