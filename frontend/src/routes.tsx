import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductsPage from './pages/productsPage';
import ProductDetailPage from './pages/productDetailPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/:productId" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default App;
