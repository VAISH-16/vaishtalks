
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;


