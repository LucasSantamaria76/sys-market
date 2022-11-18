import { Button, FocusTrap, Grid, Modal, NumberInput, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { cashOutsSchema } from '../validationSchemas/cashOutsSchema';

const ModalNewCashOrEditOuts = ({ opened, setOpened, toEdit, handleSaveOuts }) => {
  const theme = useMantineTheme();

  const initialValues = !toEdit
    ? {
        description: 'Retiro',
        amount: '',
      }
    : {
        description: toEdit.description,
        amount: +toEdit.amount,
      };

  const FormCashOuts = useForm({
    initialValues,
    validate: zodResolver(cashOutsSchema),
  });
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Title order={3} color={theme.primaryColor}>
          {toEdit ? 'Editar' : 'Nueva'} salida
        </Title>
      }
      size={'md'}
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      shadow={'2px 2px 10px rgba(0,0,0,0.75)'}
      centered>
      <form
        onSubmit={FormCashOuts.onSubmit((values) => {
          handleSaveOuts(values);
          FormCashOuts.reset();
          setOpened(false);
        })}>
        <FocusTrap active={true}>
          <TextInput
            withAsterisk
            mb={10}
            label={'Descripción'}
            description='de la salida'
            {...FormCashOuts.getInputProps('description')}
          />
          <NumberInput
            withAsterisk
            data-autofocus
            mt={10}
            min={0}
            label='Importe'
            description='de la salida'
            hideControls
            {...FormCashOuts.getInputProps('amount')}
          />
        </FocusTrap>
        <Grid justify={'space-between'} align='flex-end' mt={10}>
          <Text size='xs' color={'pink'}>
            * Campos requeridos
          </Text>
          <Grid justify={'flex-end'} m={10}>
            <Button type='button' color='pink' mr={10} onClick={() => setOpened(false)}>
              Cancelar
            </Button>
            <Button type='submit' variant='light'>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default ModalNewCashOrEditOuts;
