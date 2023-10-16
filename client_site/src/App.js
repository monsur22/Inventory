import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './component/AuthContext'; // Import your AuthProvider component
import NewPage from './pages/NewPage';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Home from './pages/Dashboard/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Category from './pages/Category/Category';
import Supplier from './pages/Supplier/Supplier';
import Product from './pages/Product/Product';
import Login from './pages/Auth/Login';
import Page404 from './pages/NotFound/Page404';
import Registration from './pages/Auth/Registration';
import EmailVerification from './pages/Auth/EmailVerification';
import ForgetPassword from './pages/Auth/ForgetPassword';
import PasswrodReset from './pages/Auth/PasswrodReset';
import PublicRoute from './component/Route/PublicRoute ';
import PrivateRoute from './component/Route/PrivateRoute '
import Customers from './pages/Customer/Customers';
import Pos from './pages/Pos/Pos';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/singup" element={<Registration />} />
                        <Route path="/email-verify/:token" element={<EmailVerification />} />
                        <Route path="/forget-password" element={<ForgetPassword />} />
                        <Route path="/password-reset/:token" element={<PasswrodReset />} />
                        <Route path="/*" element={<Page404 />} />
                    </Route>

                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/newpage" element={<NewPage />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/supplier" element={<Supplier />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/pos" element={<Pos />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>

    );

  }

export default App;
