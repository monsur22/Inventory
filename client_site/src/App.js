import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './component/pages/AuthContext'; // Import your AuthProvider component
import NewPage from './component/pages/NewPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/pages/Home';
import Dashboard from './component/pages/Dashboard';
import Category from './component/pages/Category';
import Supplier from './component/pages/Supplier';
import Product from './component/pages/Product';
import Login from './component/pages/Login';
import Page404 from './component/pages/Page404';
import PrivateRoute from './component/pages/PrivateRoute '
import Registration from './component/pages/Registration';
import EmailVerification from './component/pages/EmailVerification';
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/singup" element={<Registration />} />
                    <Route path="/*" element={<Page404 />} />
                    <Route path="/email-verify/:token" element={<EmailVerification />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/newpage" element={<NewPage />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/supplier" element={<Supplier />} />
                        <Route path="/product" element={<Product />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>

    );

  }

export default App;
