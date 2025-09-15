import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import type { Product } from '../features/products/types';
import { useAddToCartMutation } from '../features/cart/cartApi';

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const [addToCart, { isLoading }] = useAddToCartMutation();

    const handleAdd = () => {
        addToCart({ productId: product.id, quantity: 1 });
    };

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    ₹{product.price.toFixed(2)}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleAdd}
                    disabled={isLoading}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;