import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { useGetCartQuery } from '../features/cart/cartApi';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () => {
    const { data } = useGetCartQuery();
    const cartCount = data?.totalItems ?? 0;

    return (
        <AppBar position="sticky" color="transparent" elevation={0} sx={{
            background: 'linear-gradient(90deg, rgba(2,6,23,0.9) 0%, rgba(15,23,42,0.9) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'saturate(180%) blur(8px)'
        }}>
            <Toolbar sx={{ py: 1 }}>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 0.4, color: 'common.white', cursor: 'pointer', textDecoration: 'none' }}
                    component={Link}
                    to="/products"
                >
                    NestShop
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/products" sx={{ mr: 1 }} startIcon={<HomeIcon />}>
                    Browse
                </Button>
                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge color="secondary" badgeContent={cartCount} overlap="circular">
                        <ShoppingCartIcon htmlColor="#fff" />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};


export default NavBar;