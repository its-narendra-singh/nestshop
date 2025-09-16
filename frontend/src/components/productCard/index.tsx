import { CardContent, CardMedia, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { Product } from '../../features/products/types';
import { useRemoveFromCartMutation, useSetCartItemQuantityMutation } from '../../features/cart/cartApi';
import { useSelector } from 'react-redux';
import { selectCartSummary } from '../../features/cart/cartSlice';
import { RootCard, MediaBox, OverlayIconButton, NewChip, QtyButton, QtyDisplay } from './styles';

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const cart = useSelector(selectCartSummary);
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
        <RootCard>
            <MediaBox>
                <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover', filter: 'saturate(1.05)' }}
                />
                <OverlayIconButton size="small">
                    <FavoriteBorderIcon fontSize="small" />
                </OverlayIconButton>
                <NewChip color="secondary" size="small" label="New" />
            </MediaBox>
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
                        <QtyButton
                            onClick={handleDecrement}
                            aria-label="decrease"
                            variant="outlined"
                            color="primary"
                        >
                            <RemoveIcon />
                        </QtyButton>
                        <QtyDisplay
                            disabled
                            variant="outlined"
                        >
                            {quantity}
                        </QtyDisplay>
                        <QtyButton
                            onClick={handleIncrement}
                            aria-label="increase"
                            variant="outlined"
                            color="primary"
                        >
                            <AddIcon />
                        </QtyButton>
                    </Box>
                ) : (
                    <QtyButton
                        size="medium"
                        variant="contained"
                        fullWidth
                        onClick={handleAdd}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding…' : 'Add to Cart'}
                    </QtyButton>
                )}
            </CardContent>
        </RootCard>
    );
};

export default ProductCard;