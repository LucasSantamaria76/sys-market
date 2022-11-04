import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API = 'http://localhost:4000/sales';

export const salesApi = createApi({
  reducerPath: 'salesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['sales'],
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (sale) => ({
        url: '/',
        method: 'POST',
        body: sale,
      }),
      invalidatesTags: ['sales'],
    }),
    getAllSales: builder.query({
      query: () => '',
      providesTags: ['sales'],
    }),
    getSaleOfTheDay: builder.query({
      query: (date) => (date ? '/?date=' + date : '/'),
      providesTags: ['sales'],
      invalidatesTags: ['sales'],
    }),
  }),
});

export const { useCreateSaleMutation, useGetAllSalesQuery, useGetSaleOfTheDayQuery } = salesApi;
