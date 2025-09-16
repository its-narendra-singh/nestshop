import { Typography, List, ListItem, ListItemText, IconButton, Card, CardContent, Avatar, Box, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetCartQuery, useRemoveFromCartMutation } from '../../features/cart/cartApi';
import { useSelector } from 'react-redux';
import { selectCartSummary } from '../../features/cart/cartSlice';
import { PageGrid, SummaryCard } from './styles';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';

const CartPage = () => {
    const { isLoading, isError } = useGetCartQuery();
    const data = useSelector(selectCartSummary);
    const [removeFromCart] = useRemoveFromCartMutation();

    if (isLoading) return <LoadingSpinner />;
    if (isError || !data) return <ErrorState title="Failed to load cart" />;

    if (data.items.length === 0) {
        return (
            <Card sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Your cart is empty</Typography>
                <Typography color="text.secondary">Browse products and add items to see them here.</Typography>
            </Card>
        );
    }

    return (
        <PageGrid>
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Your Cart</Typography>
                    <List>
                        {data.items.map(item => (
                            <>
                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => removeFromCart({ id: item.id })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <Avatar src={item.product.image} alt={item.product.name} sx={{ mr: 2, width: 48, height: 48 }} />
                                    <ListItemText
                                        primaryTypographyProps={{ fontWeight: 600 }}
                                        primary={`${item.product.name} x${item.quantity}`}
                                        secondary={`₹${(item.product.price * item.quantity).toFixed(2)}`}
                                    />
                                </ListItem>
                                <Divider component="li" />
                            </>
                        ))}
                    </List>
                </CardContent>
            </Card>
            <SummaryCard>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>Summary</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="text.secondary">Items</Typography>
                        <Typography>{data.totalItems}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography color="text.secondary">Total</Typography>
                        <Typography variant="h6">₹{data.totalPrice.toFixed(2)}</Typography>
                    </Box>
                    <Button variant="contained" color="primary" fullWidth disabled={data.totalItems === 0}>Checkout</Button>
                </CardContent>
            </SummaryCard>
        </PageGrid>
    );
};

export default CartPage;


