import {
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
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

    return (
        <>
            <Typography variant="h5" sx={{ mt: 2 }}>Your Cart</Typography>
            <List>
                {data.items.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <IconButton edge="end" onClick={() => removeFromCart({ id: item.id })}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText
                            primary={`${item.product.name} x${item.quantity}`}
                            secondary={`₹${item.product.price * item.quantity}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6">Total: ₹{data.totalPrice.toFixed(2)}</Typography>
        </>
    );
};

export default CartPage;