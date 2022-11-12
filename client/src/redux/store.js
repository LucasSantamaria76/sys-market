import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { productsApi } from './apis/productsApi';
import { providersApi } from './apis/providers';
import { saleSlice } from './slices/saleSlice';
import { salesApi } from './apis/salesApi';
import { authSlice } from './slices/authSlice';
import { usersSlice } from './slices/usersSlice';
import { purchasesSlice } from './slices/purchasesSlice';

const middlewareApis = [productsApi.middleware, providersApi.middleware, salesApi.middleware];

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    sale: saleSlice.reducer,
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    purchase: purchasesSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewareApis),
});

setupListeners(store.dispatch);
