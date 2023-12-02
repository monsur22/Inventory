import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import GuestLayout from "../../component/layout/GuestLayout";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
      });
      const [validationError, setValidationError] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost/api/auth/reset-password', formData);
          console.log(response);

          if (response.data.success) {
            setFormData({ email: '' });
            Swal.fire(
              'Reset password',
              'Reset password link send your email ',
              'success'
            );
          } else {
            setFormData({ email: '' });
            Swal.fire('Registration Failed', 'Please try again later.', 'error');
          }
        } catch (error) {
            if (error.response) {
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
                                Reset Password
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
                                        autoComplete="eamil"
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

                                <div className="row">

                                    <div className="col-6">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"

                                        >
                                            Send Reset Link
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <p className="mb-0">
                                <Link to="/login">Sing In Page</Link>
                            </p>
                        </div>
                    </div>
                </div>
            <ToastContainer />
            </GuestLayout>
        </>
    );
};

export default ForgetPassword;
