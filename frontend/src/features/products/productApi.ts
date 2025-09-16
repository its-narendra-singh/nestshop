import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './types';
import { setProducts } from './productSlice';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Product'],
    endpoints: builder => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProducts(data));
                } catch (e) {
                    // ignore
                }
            },
        }),
    }),
});

export const { useGetProductsQuery } = productApi;