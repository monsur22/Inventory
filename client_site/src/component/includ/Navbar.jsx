import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faSearch,
    faTh,
    faAngleLeft,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        console.log("clcik in logout funciton")
        try {
          // Send a POST request to your server's /logout endpoint
          const response = await axios.post('http://localhost/api/auth/logout', null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (response.data.status === 'success') {
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            // Handle logout failure
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
  return (
      <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-widget="pushmenu"
                            href="#"
                            role="button"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </a>
                    </li>

                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="" class="nav-link">
                            Home
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true"  role="button" onClick={()=>handleLogout()}>
                    Logout
                    </a>
                </li>
                </ul>

            </nav>
      </>
  );
}

export default Navbar