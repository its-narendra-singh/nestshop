// src/pages/ProductsPage.tsx
import { Grid, CircularProgress, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../features/products/productApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductsPage = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const dispatch = useDispatch();

    const handleAddToCart = (productId: string) => {
        dispatch(addToCart({ productId }));
    };

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">Failed to load products.</Typography>;

    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {products?.map(product => (
                // @ts-ignore
                <Grid item key={product.id}>
                    <ProductCard product={product} onAddToCart={handleAddToCart} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsPage;