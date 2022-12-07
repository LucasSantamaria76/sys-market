import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import './app.css';
import { HeaderContainer } from './components';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import 'dayjs/locale/es'; //
import dayjs from 'dayjs';

dayjs.extend(isLeapYear); // use plugin
dayjs.locale('es'); // use locale

const pages = [
  { link: 'home', label: 'Inicio' },
  { link: 'sales', label: 'Ventas' },
  { link: 'products', label: 'Productos' },
  { link: 'providers', label: 'Proveedores' },
  { link: 'management', label: 'Administración' },
];

const App = () => {
  useScrollLock(true, { disableBodyPadding: true });
  return (
    <AppShell
      header={<HeaderContainer links={pages} />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[1],
          padding: 0,
          height: '100%',
        },
      })}>
      <Outlet />
    </AppShell>
  );
};
export default App;
