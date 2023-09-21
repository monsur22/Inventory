import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faSearch,
    faTh,
    faAngleLeft,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
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
            </nav>
      </>
  );
}

export default Navbar