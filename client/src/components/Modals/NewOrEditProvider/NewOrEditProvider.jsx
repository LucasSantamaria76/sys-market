import { Button, Grid, Modal, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useCreateProviderMutation, useUpdateProviderMutation } from '../../../redux/apis/providers';
import { providerSchema } from '../../../validationSchemas/providerSchema';
import { showError, showSuccess } from './../../../utils/notifications';

export const NewOrEditProvider = ({ opened, setOpened, providerToEdit }) => {
  const theme = useMantineTheme();
  const [createProvider, { isLoading: isLoadingNew, error: errorNew }] = useCreateProviderMutation();
  const [updateProvider, { isLoading: isLoadingEdit, error: errorEdit }] = useUpdateProviderMutation();

  const initialValues = !providerToEdit
    ? {
        nameProvider: '',
        address: '',
        phone: '',
      }
    : {
        nameProvider: providerToEdit.nameProvider,
        address: providerToEdit.address,
        phone: providerToEdit.phone,
      };

  const labels = ['Nombre', 'Dirección', 'Teléfono'];

  const error = !providerToEdit ? errorNew : errorEdit;
  const isLoading = !providerToEdit ? isLoadingNew : isLoadingEdit;

  const FormProvider = useForm({
    initialValues,
    validate: zodResolver(providerSchema),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`${providerToEdit ? 'Editar' : 'Nuevo'} Proveedor`}
      size={'md'}
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      shadow={'2px 2px 10px rgba(0,0,0,0.75)'}
      centered>
      <form
        onSubmit={FormProvider.onSubmit(async (values) => {
          !providerToEdit
            ? await createProvider(values).unwrap()
            : await updateProvider({ ...values, id: providerToEdit.id }).unwrap();
          if (!error) {
            FormProvider.reset();
            setOpened(false);
            showNotification(showSuccess('Proveedor guardado con éxito'));
          } else showNotification(showError('No se pudo guardar el Proveedor'));
        })}>
        {Object.keys(initialValues).map((item, idx) => (
          <TextInput
            key={item}
            data-autofocus={idx === 0}
            withAsterisk={idx === 0}
            mb={10}
            label={labels[idx]}
            placeholder={`Ingresar ${labels[idx].toLowerCase()} del proveedor`}
            {...FormProvider.getInputProps(item)}
          />
        ))}
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
