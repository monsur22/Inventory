import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import GuestLayout from "../layout/GuestLayout";
import Swal from 'sweetalert2';
function PasswrodReset() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation:''
  });

  async function handleUpdatedPassword(e,token) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost/api/auth/reset-password/${token}`, formData);
      console.log(response)
      console.log(token)
      if (response.data.success) {
        // localStorage.setItem('token', response.data.token);
        window.location.href = '/login?passwordResetSuccess=true';
        // navigate('/')
        Swal.fire(
            'Reset Password',
            'Password update successfully',
            'success'
          );
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
                        Passwrod confirmation
                    </p>
                    <form onSubmit={(e) =>  handleUpdatedPassword(e,token)}>
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
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password Confirm"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password_confirmation: e.target.value})
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
                            <div className="col-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"

                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </GuestLayout>
</>
  );
}

export default PasswrodReset;
