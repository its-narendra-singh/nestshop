import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CartSummary } from './types';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Cart'],
    endpoints: builder => ({
        getCart: builder.query<CartSummary, void>({
            query: () => '/cart',
            providesTags: ['Cart'],
        }),
        addToCart: builder.mutation<void, { productId: string; quantity: number }>({
            query: body => ({
                url: '/cart',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Cart'],
        }),
        removeFromCart: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
} = cartApi;