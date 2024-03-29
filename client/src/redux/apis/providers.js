import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../constants/constants';

export const providersApi = createApi({
  reducerPath: 'providersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API + 'providers',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['providers'],
  endpoints: (builder) => ({
    getProviders: builder.query({
      query: () => '',
      providesTags: ['providers'],
    }),
    getProviderById: builder.query({
      query: (id) => '/' + id,
      providesTags: ['providers'],
    }),
    updateProvider: builder.mutation({
      query: ({ id, ...dataProvider }) => ({
        url: '/' + id,
        method: 'PUT',
        body: dataProvider,
      }),
      invalidatesTags: ['providers'],
      extraOptions: { maxRetries: 0 },
    }),
    createProvider: builder.mutation({
      query: (provider) => ({
        url: '/',
        method: 'POST',
        body: provider,
      }),
      invalidatesTags: ['providers'],
      extraOptions: { maxRetries: 0 },
    }),
    deleteProvider: builder.mutation({
      query: (id) => ({
        url: '/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['providers'],
      extraOptions: { maxRetries: 0 },
    }),
    addProductToProvider: builder.mutation({
      query: ({ id, ...restProduct }) => ({
        url: '/' + id,
        method: 'PATCH',
        body: restProduct,
      }),
      invalidatesTags: ['providers'],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetProvidersQuery,
  useGetProviderByIdQuery,
  useDeleteProviderMutation,
  useCreateProviderMutation,
  useAddProductToProviderMutation,
  useUpdateProviderMutation,
} = providersApi;
