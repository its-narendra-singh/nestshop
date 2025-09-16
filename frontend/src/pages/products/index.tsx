import { Box, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo, useState } from 'react';
import ProductCard from '../../components/productCard';
import { useGetProductsQuery } from '../../features/products/productApi';
import { useGetCartQuery } from '../../features/cart/cartApi';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../features/products/productSlice';
import { GridContainer, HeaderCard, HeaderSurface, ActionsBox, SearchField } from './styles';
import ProductGridSkeleton from '../../components/ProductGridSkeleton';
import ErrorState from '../../components/ErrorState';

const ProductsPage = () => {
    const { isLoading, isError } = useGetProductsQuery();
    // Hydrate cart slice so ProductCard selectors have data
    useGetCartQuery();
    const products = useSelector(selectProducts);
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => (products ?? []).filter(p => p.name.toLowerCase().includes(query.toLowerCase())), [products, query]);

    if (isLoading) return <ProductGridSkeleton />;
    if (isError) return <ErrorState title="Failed to load products" />;

    return (
        <GridContainer>
            <HeaderCard>
                <HeaderSurface>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 0.4, mb: 0.5 }}>Discover Products</Typography>
                        <Typography color="text.secondary">Browse our latest collection and add your favorites to cart.</Typography>
                    </Box>
                    <ActionsBox>
                        <SearchField
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            placeholder="Search products"
                            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                        />
                    </ActionsBox>
                </HeaderSurface>
            </HeaderCard>
            {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </GridContainer>
    );
};

export default ProductsPage;