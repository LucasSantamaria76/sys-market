import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { RouterProvider } from 'react-router-dom';
import { theme } from './styles/theme';
import { store } from './redux/store';

import { router } from './routes/Routes';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ModalsProvider>
        <NotificationsProvider zIndex={2077} autoClose={2000}>
          <RouterProvider router={router} />
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  </Provider>
);
