import { Avatar, Button, Container, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Management = () => {
  return (
    <Container size='xl' pt={50} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button sx={{ height: '300px', width: '300px' }} variant='outline'>
        <Stack sx={{ alignItems: 'center' }}>
          <Avatar size='140px' src='https://sglchile.cl/wp-content/uploads/2022/01/login-usuario-3.png' />
          <Text align='center' size={'lg'} mb={10}>
            Gestion de operadores
          </Text>
        </Stack>
      </Button>
      <Button component={Link} to='/salesListByDate' sx={{ height: '300px', width: '300px' }} variant='outline' ml={50}>
        <Stack sx={{ alignItems: 'center' }}>
          <Avatar
            size='140px'
            src='https://binaries.templates.cdn.office.net/support/templates/es-es/lt55996843_quantized.png'
          />
          <Text align='center' size={'lg'} mb={10}>
            Listado de ventas por fecha
          </Text>
        </Stack>
      </Button>
    </Container>
  );
};
