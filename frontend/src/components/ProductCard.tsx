import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Chip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { Product } from '../features/products/types';
import { useGetCartQuery, useRemoveFromCartMutation, useSetCartItemQuantityMutation } from '../features/cart/cartApi';

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const { data: cart } = useGetCartQuery();
    const [setQuantity, { isLoading }] = useSetCartItemQuantityMutation();
    const [removeFromCart] = useRemoveFromCartMutation();

    const currentItem = cart?.items.find(i => i.productId === product.id);
    const quantity = currentItem?.quantity ?? 0;

    const handleAdd = () => {
        setQuantity({ productId: product.id, quantity: 1 });
    };

    const handleIncrement = () => {
        setQuantity({ productId: product.id, quantity: quantity + 1 });
    };

    const handleDecrement = () => {
        if (!currentItem) return;
        if (quantity <= 1) {
            removeFromCart({ id: currentItem.id });
        } else {
            setQuantity({ productId: product.id, quantity: quantity - 1 });
        }
    };

    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 320,
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1.5,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
                backgroundColor: 'background.paper',
                transition: 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
                    borderColor: 'rgba(255,255,255,0.14)'
                }
            }}
        >
            <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover', filter: 'saturate(1.05)' }}
                />
                <IconButton
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.35)', color: 'common.white', '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' } }}
                >
                    <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <Chip
                    color="secondary"
                    size="small"
                    label="New"
                    sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 700, borderRadius: 1 }}
                />
            </Box>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                    {product.name}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                    ₹{product.price.toFixed(2)}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {quantity > 0 ? (
                    <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                        <Button
                            onClick={handleDecrement}
                            aria-label="decrease"
                            variant="outlined"
                            color="primary"
                            sx={{ borderRadius: 1, minWidth: 48, flex: '0 0 auto' }}
                        >
                            <RemoveIcon />
                        </Button>
                        <Button
                            disabled
                            variant="outlined"
                            sx={{
                                borderRadius: 1,
                                minWidth: 64,
                                flex: '1 1 auto',
                                pointerEvents: 'none',
                                color: 'text.primary',
                                fontWeight: 700
                            }}
                        >
                            {quantity}
                        </Button>
                        <Button
                            onClick={handleIncrement}
                            aria-label="increase"
                            variant="outlined"
                            color="primary"
                            sx={{ borderRadius: 1, minWidth: 48, flex: '0 0 auto' }}
                        >
                            <AddIcon />
                        </Button>
                    </Box>
                ) : (
                    <Button
                        size="medium"
                        variant="contained"
                        fullWidth
                        onClick={handleAdd}
                        disabled={isLoading}
                        sx={{ borderRadius: 1 }}
                    >
                        {isLoading ? 'Adding…' : 'Add to Cart'}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;