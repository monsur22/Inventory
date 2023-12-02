import React from 'react'
import Header from '../includ/Header'
import Sidebar from '../includ/Sidebar'
import '../../assets/admin/css/adminlte.css'
import Navbar from '../includ/Navbar';
import Footer from '../includ/Footer';
import '../../assets/admin/css/adminlte.css'
const GuestLayout = ({children}) => {
  return (
    <div className="hold-transition login-page">
        {children}

    </div>
  )
}

export default GuestLayout