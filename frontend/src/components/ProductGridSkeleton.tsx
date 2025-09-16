import { Box, Skeleton } from '@mui/material';

interface Props {
    columns?: number;
    count?: number;
}

const ProductGridSkeleton = ({ columns = 4, count = 8 }: Props) => (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: `repeat(2, 1fr)`, md: `repeat(3, 1fr)`, lg: `repeat(${columns}, 1fr)` } }}>
        {Array.from({ length: count }).map((_, i) => (
            <Box key={i}>
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2, mb: 1 }} />
                <Skeleton variant="text" height={28} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2, mt: 1 }} />
            </Box>
        ))}
    </Box>
);

export default ProductGridSkeleton;


