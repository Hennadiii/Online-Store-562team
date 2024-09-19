import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
