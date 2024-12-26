import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import PreLoader from '../components/shared/preLoader';
import ProductDetailPage from '../pages/productDetailPage';

const HomePage = lazy(() => import('../pages/homePage'));
const CatalogPage = lazy(() => import('../pages/catalogPage'));
const AboutUsPage = lazy(() => import('../pages/aboutUsPage'));
const DivansPage = lazy(() => import('../pages/divans'));
const CheckoutPage = lazy(() => import('../pages/checkoutPage'));
const NotFoundPage404 = lazy(() => import('../pages/NotFoundPage404'));

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<SuspenseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/divans" element={<DivansPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage404 />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;

const SuspenseLayout = () => (
  <Suspense fallback={<PreLoader />}>
    <Outlet />
  </Suspense>
);
