import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartSummary, CartItem as ApiCartItem } from './types';

// Use API cart item shape in state so UI can render details
type CartItem = ApiCartItem;

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart(state) {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
        setCartSummary(state, action: PayloadAction<CartSummary>) {
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
            state.totalPrice = action.payload.totalPrice;
        }
    },
});

export const { clearCart, setCartSummary } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartSummary = (state: { cart: CartState }) => ({
    items: state.cart.items,
    totalItems: state.cart.totalItems,
    totalPrice: state.cart.totalPrice,
});