import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API = 'http://localhost:4000/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API,
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
  tagTypes: ['products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '',
      providesTags: ['products'],
    }),
    getProductsOfProvider: builder.query({
      query: (ProviderID) => '/ProdByProv?providerID=' + ProviderID,
      providesTags: ['products'],
    }),
    getProductById: builder.query({
      query: (barcode) => '/' + barcode,
      providesTags: ['products'],
    }),
    deleteProduct: builder.mutation({
      query: (barcode) => ({
        url: '/' + barcode,
        method: 'delete',
      }),
      invalidatesTags: ['products'],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/',
        method: 'post',
        body: product,
      }),
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation({
      query: ({ barcode, ...restProduct }) => ({
        url: '/' + barcode,
        method: 'put',
        body: restProduct,
      }),
      invalidatesTags: ['products'],
    }),
    updateStock: builder.mutation({
      query: ({ barcode, isReduce, quantity }) => ({
        url: '/' + barcode,
        method: 'PATCH',
        body: { isReduce, quantity },
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetProductsOfProviderQuery,
  useUpdateStockMutation,
} = productsApi;
