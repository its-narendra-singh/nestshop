import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const PageGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 24,
    marginTop: 8,
    '@media (min-width:900px)': {
        gridTemplateColumns: '2fr 1fr',
    },
});

export const SummaryCard = styled(Card)({
    height: 'fit-content',
});


