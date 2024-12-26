import { Suspense } from 'react';
import PreLoader from '../components/shared/preLoader';
import { Route } from 'react-router-dom';

interface props {
  element: JSX.Element;
  path: string;
}

const RouteLayout: React.FC<props> = ({ element, path }) => {
  return (
    <Route
      path={path}
      element={<Suspense fallback={<PreLoader />}>{element}</Suspense>}
    />
  );
};

export default RouteLayout;
