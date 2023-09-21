import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faSearch,
    faTh,
    faAngleLeft,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img
                    src="/assets/img/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                />
                <span className="brand-text font-weight-light">Inventory</span>
            </a>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src="/assets/img/user2-160x160.jpg"
                            className="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">
                            Alexander Pierce
                        </a>
                    </div>
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input
                            className="form-control form-control-sidebar"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <a href="" className="nav-link">
                                <FontAwesomeIcon
                                    icon={faTh}
                                    className="nav-icon"
                                />
                            <Link to="/" relative="path"> Dashboard</Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    className="nav-icon"
                                />
                            <Link to="/newpage" relative="path"> New Page</Link>

                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    className="nav-icon"
                                />
                            <Link to="/category" relative="path"> Category</Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    className="nav-icon"
                                />
                                <p>Supplier</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    className="nav-icon"
                                />
                                <p>Product</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
