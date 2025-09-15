export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}

export interface CartSummary {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}