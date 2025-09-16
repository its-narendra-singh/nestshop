import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const GridContainer = styled(Box)({
    marginTop: 4,
    display: 'grid',
    gap: 24,
    gridTemplateColumns: '1fr',
    '@media (min-width:600px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
    '@media (min-width:900px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
    '@media (min-width:1200px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
});

export const HeaderCard = styled(Box)({
    gridColumn: '1 / -1',
});

export const HeaderSurface = styled(Box)({
    padding: 20,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.06)',
    background: 'linear-gradient(135deg, rgba(2,6,23,0.9) 0%, rgba(15,23,42,0.9) 100%)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    gap: 20,
    '@media (min-width:900px)': {
        padding: 32,
        gridTemplateColumns: '1fr auto',
    },
});

export const ActionsBox = styled(Box)({
    display: 'flex',
    gap: 8,
});

export const SearchField = styled(TextField)({
    minWidth: '100%',
    '@media (min-width:900px)': { minWidth: 420 },
});


