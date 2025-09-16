import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0b0b0d',
            paper: '#121214',
        },
        primary: { main: '#60a5fa' },
        secondary: { main: '#f472b6' },
        text: { primary: '#e5e7eb', secondary: '#9ca3af' },
    },
    shape: { borderRadius: 14 },
    typography: {
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        h6: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 700 },
    },
    components: {
        MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
        MuiCard: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
});

export default theme;