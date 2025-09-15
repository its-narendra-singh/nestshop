// src/features/products/productApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './types';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Product'],
    endpoints: builder => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
        }),
    }),
});

export const { useGetProductsQuery } = productApi;