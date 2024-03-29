import { Button, Modal, PasswordInput, TextInput, Title, useMantineTheme } from '@mantine/core';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { fetchApi } from '../API/fetchApi';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { showError } from '../utils/notifications';

export const ModalLogin = ({ opened, setOpened }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const FormLogin = useForm({
    initialValues: {
      userName: '',
      password: '',
    },
    validate: {
      userName: (value) => (value.length < 4 ? 'El nombre de usuario debe tener mínimo 4 letras' : null),
      password: (value) => (value.length < 6 ? 'Su password debe tener mínimo 6 caracteres' : null),
    },
  });
  return (
		<Modal
			opened={opened}
			onClose={() => {
				FormLogin.reset();
				setOpened(false);
			}}
			title={
				<Title color={theme.primaryColor} order={3}>
					Iniciar sesión
				</Title>
			}
			centered>
			<form
				onSubmit={FormLogin.onSubmit(async (values) => {
					setLoading(true);
					const res = await fetchApi({ endPoint: 'auth/login', method: 'POST', body: values });
					if (res.success) {
						FormLogin.reset();
						setOpened(false);
						dispatch(login(res.user));
					} else showNotification(showError(res.error));
					setLoading(false);
				})}>
				<TextInput
					placeholder='Ingrese su nombre de usuario'
					label='Nombre de usuario'
					withAsterisk
					data-autofocus
					{...FormLogin.getInputProps('userName')}
				/>
				<PasswordInput
					label='Contraseña'
					placeholder='Ingrese su contraseña'
					withAsterisk
					autoComplete='off'
					visibilityToggleIcon={({ reveal, size }) =>
						reveal ? <IoEyeOffOutline size={size} /> : <IoEyeOutline size={size} />
					}
					mb={10}
					{...FormLogin.getInputProps('password')}
				/>
				<Button type='submit' variant='outline' mt={15} loading={loading}>
					{loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
				</Button>
			</form>
		</Modal>
	);
};
