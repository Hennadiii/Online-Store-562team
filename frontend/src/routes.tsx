import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
