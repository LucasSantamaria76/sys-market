import { Box, Button, Container, Grid } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAPI, updateUserAPI } from '../../functions/functionsUser';
import { addNewUser, updateUser } from '../../redux/slices/usersSlice';
import { styles } from '../../styles/styles';
import { FormOperador } from '../../components';
import { DataTableUsers } from '../../components';

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
      const data = await registerUserAPI(user);
      if (data.user) {
        dispatch(addNewUser(data.user));
        setUser(initialUser);
      }
    } else {
      const data = await updateUserAPI(token, user);
      if (data) {
        dispatch(updateUser(data));
        setUser(initialUser);
      }
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
