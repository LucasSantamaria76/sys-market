import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';

import { Sales } from '../pages/Sales/Sales';
import App from '../App';
import { Products } from '../pages/Products/Products';
import { Providers } from './../pages/Providers/Providers';
import { Management } from './../pages/Management/Management';
import { Home } from './../pages/Home/Home';
import { SalesListByDate } from './../pages/SalesListByDate/SalesListByDate';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'sales',
        element: <Sales />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'providers',
        element: <Providers />,
      },
      {
        path: 'management',
        element: <Management />,
      },
      {
        path: 'salesListByDate',
        element: <SalesListByDate />,
      },
    ],
  },
]);
