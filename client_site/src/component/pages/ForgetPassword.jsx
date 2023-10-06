import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import GuestLayout from "../layout/GuestLayout";
import Swal from 'sweetalert2'
const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
      });
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
          console.error('Error during registration:', error);
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


                            {/* <p className="mb-1">
                                <Link>Already have account?</Link>
                            </p>
                            <p className="mb-0">
                                <Link to="/login">Log In</Link>
                            </p> */}
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default ForgetPassword;
