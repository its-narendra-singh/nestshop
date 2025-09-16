import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
    </Box>
);

export default LoadingSpinner;


