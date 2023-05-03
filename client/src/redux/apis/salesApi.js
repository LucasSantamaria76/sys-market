import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../constants/constants';

export const salesApi = createApi({
  reducerPath: 'salesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API + 'sales',
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
