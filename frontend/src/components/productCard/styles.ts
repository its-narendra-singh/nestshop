import { styled } from '@mui/material/styles';
import { Card, Box, Button, IconButton, Chip } from '@mui/material';

export const RootCard = styled(Card)({
    width: '100%',
    maxWidth: 320,
    height: 420,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
    backgroundColor: 'background.paper',
    transition: 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
        borderColor: 'rgba(255,255,255,0.14)'
    }
});

export const MediaBox = styled(Box)({
    position: 'relative',
    height: 220,
    overflow: 'hidden',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
});

export const OverlayIconButton = styled(IconButton)({
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'white',
    '&:hover': { backgroundColor: 'rgba(0,0,0,0.55)' },
});

export const NewChip = styled(Chip)({
    position: 'absolute',
    top: 8,
    left: 8,
    fontWeight: 700,
    borderRadius: 4,
});

export const QtyButton = styled(Button)({
    borderRadius: 4,
    minWidth: 48,
    flex: '0 0 auto'
});

export const QtyDisplay = styled(Button)({
    borderRadius: 4,
    minWidth: 64,
    flex: '1 1 auto',
    pointerEvents: 'none',
    color: 'text.primary',
    fontWeight: 700
});


