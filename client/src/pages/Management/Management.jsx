import { Avatar, Button, ScrollArea, Stack, Text, Grid, Container, Center } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUsers } from '../../redux/slices/usersSlice';
import { fetchApi } from './../../API/fetchApi';

const buttons = [
  { title: 'Gestion de usuarios', avatar: 'controlUser.png', url: '/operatorManagement' },
  { title: 'Listado de ventas por fecha', avatar: 'calendar.png', url: '/salesListByDate' },
  { title: 'Registro de retiro de efectivo', avatar: 'cashRregister.png', url: '/cashOuts' },
];

export const Management = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const getAndSetUsers = async () => {
      try {
        const res = await fetchApi({ endPoint: '/users', token });
        res?.length && dispatch(setUsers(res));
      } catch (error) {
        console.log(error);
      }
    };
    getAndSetUsers();
  }, [dispatch, token]);
  return (
    <ScrollArea style={{ height: '93vh' }}>
      <Container size='lg'>
        <Grid pt={20} justify='center' align='center'>
          {buttons.map(({ title, avatar, url }, idx) => (
            <Grid.Col key={idx} span={12} sm={6} md={4}>
              <Center>
                <Button component={Link} to={url} sx={{ height: '300px', width: '300px' }} variant='outline'>
                  <Stack sx={{ alignItems: 'center' }}>
                    <Avatar size='200px' src={`${process.env.PUBLIC_URL}assets/${avatar}`} />
                    <Text align='center' size={'lg'} mb={10}>
                      {title}
                    </Text>
                  </Stack>
                </Button>
              </Center>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </ScrollArea>
  );
};
