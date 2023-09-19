import logo from './logo.svg';
import './App.css';
import AuthLayout from './component/layout/AuthLayout';
import NewPage from './component/pages/NewPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/pages/Home';

function App() {
  return (
    <Router>
    <Routes>
      {/* Existing routes */}
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}

      {/* Add a route for the new page */}
      <Route path="/newpage" element={<NewPage />} />
    </Routes>
  </Router>
  );
}

export default App;
