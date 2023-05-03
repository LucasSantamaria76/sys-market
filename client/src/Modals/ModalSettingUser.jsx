import { Button, Flex, Modal, PasswordInput, Title, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { fetchApi } from '../API/fetchApi';
import { capitalize } from '../utils/capitalize';
import { showSuccess } from './../utils/notifications';

export const ModalSettingUser = ({ opened, setOpened, userName }) => {
  const theme = useMantineTheme();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const FormSettingUser = useForm({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validate: {
      newPassword: (value) => (value.length < 6 ? 'Su password debe tener mínimo 6 caracteres' : null),
    },
  });
  return (
    <Modal
      opened={opened}
      onClose={() => {
        FormSettingUser.reset();
        setOpened(false);
      }}
      title={
        <Title color={theme.primaryColor} order={3}>
          {capitalize(userName)}
        </Title>
      }
      centered>
      <form
        onSubmit={FormSettingUser.onSubmit(async (values) => {
          const res = await fetchApi({ endPoint: 'users', method: 'PUT', token, body: { ...values, userName } });
          if (res.success) {
            FormSettingUser.reset();
            showNotification(showSuccess('El password se modificó correctamente'));
            setOpened(false);
          } else {
            FormSettingUser.setErrors({ password: res.error });
            console.log(res.error);
          }
        })}>
        <PasswordInput
          label='Password actual'
          placeholder='Ingrese password actual'
          withAsterisk
          autoComplete='off'
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IoEyeOffOutline size={size} /> : <IoEyeOutline size={size} />
          }
          mb={10}
          {...FormSettingUser.getInputProps('password')}
        />
        <PasswordInput
          label='Nuevo password'
          placeholder='Ingrese su nuevo password'
          withAsterisk
          autoComplete='off'
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IoEyeOffOutline size={size} /> : <IoEyeOutline size={size} />
          }
          mb={10}
          {...FormSettingUser.getInputProps('newPassword')}
        />
        <Flex gap='sm' justify='flex-end'>
          <Button type='button' color='red' mt={15} onClick={() => setOpened(false)}>
            Cancelar
          </Button>
          <Button type='submit' variant='light' mt={15}>
            Guardar cambios
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
