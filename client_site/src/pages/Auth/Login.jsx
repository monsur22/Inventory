import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import GuestLayout from "../../component/layout/GuestLayout";
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const passwordResetSuccess = query.get('passwordResetSuccess') === 'true';
    const [validationError, setValidationError] = useState({
        email:'',
        password:''
    })
    useEffect(() => {
      if (passwordResetSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset',
          text: 'Password reset successful!',
          timer: 3000, // Adjust the duration as needed
          showConfirmButton: false,
        });
      }
    }, [passwordResetSuccess]);

    async function handleSignIn(e) {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost/api/auth/login', formData);
          console.log(response.data);
          if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
          } else {
            console.error('Login failed. No success in response.');
          }
        } catch (error) {
          if (error.response) {

            if (error.response.data && error.response.data.data) {
              const validationErrors = error.response.data.data;
              console.log('Validation Errors:', validationErrors);
              setValidationError({
                email: validationErrors.email ? validationErrors.email[0] : '',
                password: validationErrors.password ? validationErrors.password[0] : ''
              });
            } else {
              console.error('Error during login:', error.response.data.message);
              toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
            }
          } else {
            console.error('Network error or request failed:', error.message);
          }
        }
      }

    return (
        <>
            <GuestLayout>
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link href="/src/pages" className="h1">
                                <b>Admin</b>LTE
                            </Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">
                                Sign in to start your session
                            </p>
                            <form onSubmit={(e) =>  handleSignIn(e)}>
                                <div className="input-group mt-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value})
                                        }
                                    />

                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                                className="icon-class"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {validationError.email && <div className="text-danger">{validationError.email}</div>}
                                <div className="input-group mt-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value})
                                        }
                                    />

                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon
                                                icon={faLock}
                                                className="icon-class"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {validationError.password && <div className="text-danger" >{validationError.password}</div>}
                                <div className="row">
                                    <div className="col-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block mt-3"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <a
                                    href="src/pages/Auth/Login#"
                                    className="btn btn-block btn-primary"
                                >
                                    <FontAwesomeIcon icon={faFacebook} /> Sign
                                    in using Facebook
                                </a>
                                <a
                                    href="src/pages/Auth/Login#"
                                    className="btn btn-block btn-danger"
                                >
                                    <FontAwesomeIcon icon={faGooglePlus} /> Sign
                                    in using Google+
                                </a>
                            </div>

                            <p className="mb-1">
                                <Link to="/forget-password">Forgot your password?</Link>
                            </p>
                            <p className="mb-0">
                                <Link to="/singup">Register a new membership</Link>
                            </p>
                        </div>
                    </div>
                </div>
            <ToastContainer />
            </GuestLayout>
        </>
    );
};

export default Login;
