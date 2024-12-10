import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import PreLoader from './components/shared/preLoader';

const HomePage = lazy(() => import('./pages/homePage'));
const CatalogPage = lazy(() => import('./pages/catalogPage'));
const AboutUsPage = lazy(() => import('./pages/aboutUsPage'));
const DivansPage = lazy(() => import('./pages/divans'));
const CheckoutPage = lazy(() => import('./pages/checkoutPage'));

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PreLoader />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path="/catalog"
          element={
            <Suspense fallback={<PreLoader />}>
              <CatalogPage />
            </Suspense>
          }
        />
        <Route
          path="/about-us"
          element={
            <Suspense fallback={<PreLoader />}>
              <AboutUsPage />
            </Suspense>
          }
        />

        <Route
          path="/divans"
          element={
            <Suspense fallback={<PreLoader />}>
              <DivansPage />
            </Suspense>
          }
        />

        <Route
          path="/checkout"
          element={
            <Suspense fallback={<PreLoader />}>
              <CheckoutPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
