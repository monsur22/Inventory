import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import GuestLayout from "../../component/layout/GuestLayout";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
const Registration = () => {
    const [formData, setFormData] = useState({
        email: ''
      });
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({
        email:'',
        password:''
    })
    async function handleSignUp(e) {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost/api/auth/register', formData);
          console.log(response);

          if (response.data.success) {
            setFormData({ email: '' });
            Swal.fire(
              'Account created successfully',
              'Verification link sent to your email.',
              'success'
            );
          } else {
            console.log(response.data.data.email[0])
            if(response.data.data.email[0]){
                setFormData({ email: '' });
                toast.error(response.data.data.email[0], {
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
          }
        } catch (error) {
          console.error('Error during registration:', error);
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
                                Sign up to start your session
                            </p>
                            <form onSubmit={(e) =>  handleSignUp(e)}>
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
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <a
                                    href="src/pages/Auth/Registration#"
                                    className="btn btn-block btn-primary"
                                >
                                    <FontAwesomeIcon icon={faFacebook} /> Sign
                                    up using Facebook
                                </a>
                                <a
                                    href="src/pages/Auth/Registration#"
                                    className="btn btn-block btn-danger"
                                >
                                    <FontAwesomeIcon icon={faGooglePlus} /> Sign
                                    up using Google+
                                </a>
                            </div>

                            <p className="mb-1">
                                <Link>Already have account?</Link>
                            </p>
                            <p className="mb-0">
                                <Link to="/login">Log In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            <ToastContainer />
            </GuestLayout>
        </>
    );
};

export default Registration;
