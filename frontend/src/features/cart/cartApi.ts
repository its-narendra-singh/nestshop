import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CartSummary } from './types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ['Cart'],
    endpoints: builder => ({
        getCart: builder.query<CartSummary, void>({
            query: () => '/cart',
            providesTags: ['Cart'],
        }),
        setCartItemQuantity: builder.mutation<void, { productId: string; quantity: number }>({
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
    useSetCartItemQuantityMutation,
    useRemoveFromCartMutation,
} = cartApi;