import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import GuestLayout from "../layout/GuestLayout";
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const navigate = useNavigate();


    async function handleSignIn(e) {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost/api/auth/login', formData);
          if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
          } else {
            console.error('Login failed. No success in response.');
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      }
    return (
        <>
            <GuestLayout>
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link href="/" className="h1">
                                <b>Admin</b>LTE
                            </Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">
                                Sign in to start your session
                            </p>
                            <form onSubmit={(e) =>  handleSignIn(e)}>
                                <div className="input-group mb-3">
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
                                {/* <InputError
                                message={errors.email}
                                className="mt-2"
                            /> */}

                                <div className="input-group mb-3">
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
                                {/* <InputError
                                message={errors.password}
                                className="mt-2"
                            /> */}

                                <div className="row">
                                    {/* <div className="col-8">
                                    <div className="icheck-primary">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div> */}

                                    <div className="col-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"

                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <a
                                    href="#"
                                    className="btn btn-block btn-primary"
                                >
                                    <FontAwesomeIcon icon={faFacebook} /> Sign
                                    in using Facebook
                                </a>
                                <a
                                    href="#"
                                    className="btn btn-block btn-danger"
                                >
                                    <FontAwesomeIcon icon={faGooglePlus} /> Sign
                                    in using Google+
                                </a>
                            </div>

                            <p className="mb-1">
                                <Link>Forgot your password?</Link>
                            </p>
                            <p className="mb-0">
                                <Link to="/singup">Register a new membership</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default Login;
