import {
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Card,
    CardContent,
    Avatar,
    Box,
    Divider,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useGetCartQuery,
    useRemoveFromCartMutation,
} from '../features/cart/cartApi';

const CartPage = () => {
    const { data, isLoading, isError } = useGetCartQuery();
    const [removeFromCart] = useRemoveFromCartMutation();

    if (isLoading) return <CircularProgress />;
    if (isError || !data) return <Typography color="error">Failed to load cart.</Typography>;

    if (data.items.length === 0) {
        return (
            <Card sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Your cart is empty</Typography>
                <Typography color="text.secondary">Browse products and add items to see them here.</Typography>
            </Card>
        );
    }

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mt: 1 }}>
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
            <Card sx={{ height: 'fit-content' }}>
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
            </Card>
        </Box>
    );
};

export default CartPage;