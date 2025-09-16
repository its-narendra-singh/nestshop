import { Alert, AlertTitle, Button, Stack } from '@mui/material';

interface Props {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

const ErrorState = ({ title = 'Something went wrong', message = 'Please try again.', onRetry }: Props) => (
    <Stack spacing={2} sx={{ py: 4 }}>
        <Alert severity="error" variant="outlined">
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
        {onRetry && (
            <Button variant="outlined" color="error" onClick={onRetry} sx={{ alignSelf: 'start' }}>
                Retry
            </Button>
        )}
    </Stack>
);

export default ErrorState;


