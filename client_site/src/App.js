import logo from './logo.svg';
import './App.css';
import AuthLayout from './component/layout/AuthLayout';
import NewPage from './component/pages/NewPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/pages/Home';
import Dashboard from './component/pages/Dashboard';
import Category from './component/pages/Category';

function App() {
  return (
    <Router>
    <Routes>
      {/* Existing routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />

      {/* Add a route for the new page */}
      <Route path="/newpage" element={<NewPage />} />
      <Route path="/category" element={<Category />} />
    </Routes>
  </Router>
  );
}

export default App;
