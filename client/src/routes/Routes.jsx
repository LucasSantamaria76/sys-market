import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';

import { Sales } from '../pages/Sales/Sales';
import App from '../App';
import { Products } from '../pages/Products/Products';
import { Providers } from './../pages/Providers/Providers';
import { Management } from './../pages/Management/Management';
import { Home } from './../pages/Home/Home';
import { SalesListByDate } from './../pages/SalesListByDate/SalesListByDate';
import { OperatorManagement } from '../pages/OperatorManagement/OperatorManagement';
import { ProtectedRoute } from './ProtectedRoute';
import { CashOuts } from '../pages/CashOuts/CashOuts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'sales',
        element: (
          <ProtectedRoute to='/'>
            <Sales />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectedRoute to='/'>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: 'providers',
        element: (
          <ProtectedRoute to='/'>
            <Providers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'management',
        element: (
          <ProtectedRoute to='/'>
            <Management />
          </ProtectedRoute>
        ),
      },
      {
        path: 'salesListByDate',
        element: (
          <ProtectedRoute to='/'>
            <SalesListByDate />
          </ProtectedRoute>
        ),
      },
      {
        path: 'operatorManagement',
        element: (
          <ProtectedRoute to='/'>
            <OperatorManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cashOuts',
        element: (
          <ProtectedRoute to='/'>
            <CashOuts />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
