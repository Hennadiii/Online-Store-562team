import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import PreLoader from './components/shared/preLoader';

const HomePage = lazy(() => import('./pages/homePage'));
const CatalogPage = lazy(() => import('./pages/catalogPage'));

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
      </Routes>
    </AnimatePresence>
  );
};

export default App;
