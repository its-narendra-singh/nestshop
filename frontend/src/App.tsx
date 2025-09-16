import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/products';
import CartPage from './pages/cart';
import NavBar from './components/NavBar';
import { Container, Box, Typography } from '@mui/material';

function App() {
  return (
    <Router>
      <NavBar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<ProductsPage />} />
        </Routes>
        <Box component="footer" sx={{ mt: 6, py: 3, textAlign: 'center', color: 'text.secondary', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Typography variant="body2">© {new Date().getFullYear()} NestShop. All rights reserved.</Typography>
        </Box>
      </Container>
    </Router>
  );
}

export default App;