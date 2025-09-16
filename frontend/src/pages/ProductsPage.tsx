import { Box, Typography, TextField, InputAdornment, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../features/products/productApi';

const ProductsPage = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => (products ?? []).filter(p => p.name.toLowerCase().includes(query.toLowerCase())), [products, query]);

    if (isLoading) return (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}>
            {Array.from({ length: 8 }).map((_, i) => (
                <Box key={i}>
                    <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2, mb: 1 }} />
                    <Skeleton variant="text" height={28} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2, mt: 1 }} />
                </Box>
            ))}
        </Box>
    );
    if (isError) return <Typography color="error">Failed to load products.</Typography>;

    return (
        <Box
            sx={{
                mt: 1,
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)'
                }
            }}
        >
            <Box sx={{ gridColumn: '1 / -1' }}>
                <Box sx={{
                    p: { xs: 2.5, md: 4 },
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'linear-gradient(135deg, rgba(2,6,23,0.9) 0%, rgba(15,23,42,0.9) 100%)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
                    alignItems: 'center',
                    gap: 2.5
                }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 0.4, mb: 0.5 }}>Discover Products</Typography>
                        <Typography color="text.secondary">Browse our latest collection and add your favorites to cart.</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search products"
                            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                            sx={{ minWidth: { xs: '100%', md: 420 } }}
                        />
                    </Box>
                </Box>
            </Box>
            {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Box>
    );
};

export default ProductsPage;