import { Box, Button, Container, Grid } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, updateUser } from '../../redux/slices/usersSlice';
import { styles } from '../../styles/styles';
import { FormOperador } from '../../components';
import { DataTableUsers } from '../../components';
import { fetchApi } from './../../API/fetchApi';
import { showError, showSuccess } from '../../utils/notifications';
import { showNotification } from '@mantine/notifications';

const initialUser = {
  userName: '',
  role: '',
};

export const OperatorManagement = () => {
  const [user, setUser] = useState(initialUser);
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const handleAddOrUpdate = async () => {
    if (!user.id) {
      const data = await fetchApi({
        endPoint: 'auth/register',
        method: 'POST',
        body: { ...user, password: '123456' },
      });
      if (data.success) {
        showNotification(showSuccess(`Se creo el usuario ${data.user.userName}`));
        dispatch(addNewUser(data.user));
        setUser(initialUser);
      } else showNotification(showError(data.error));
    } else {
      const { id, ...restUser } = user;
      const { data, success, error } = await fetchApi({
        endPoint: `users/${id}`,
        method: 'PATCH',
        token,
        body: restUser,
      });
      if (success) {
        showNotification(showSuccess(`Se actualizo el usuario ${data.userName}`));
        setUser(initialUser);
        dispatch(updateUser(data));
      } else showNotification(showError(error));
    }
  };

  return (
    <Container size='md' mt={50}>
      <Grid>
        <Grid.Col span={12} sm={6}>
          <DataTableUsers setUser={setUser} token={token} />
        </Grid.Col>
        <Grid.Col span={12} sm={6}>
          <Box p={10} sx={styles}>
            <FormOperador user={user} setUser={setUser} />
            <Button type='submit' mt={20} variant='light' fullWidth onClick={handleAddOrUpdate}>
              Guardar usuario
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
