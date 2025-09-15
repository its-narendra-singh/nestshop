export class CartResponseDto {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}