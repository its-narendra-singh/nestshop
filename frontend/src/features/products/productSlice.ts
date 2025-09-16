import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './types';

export interface ProductsState {
    items: Product[];
    lastFetchedAt?: number;
}

const initialState: ProductsState = {
    items: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.items = action.payload;
            state.lastFetchedAt = Date.now();
        },
        clearProducts(state) {
            state.items = [];
            state.lastFetchedAt = undefined;
        },
    },
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;

// Selectors
export const selectProducts = (state: { products: ProductsState }) => state.products.items;
export const selectProductsLastFetchedAt = (state: { products: ProductsState }) => state.products.lastFetchedAt;


