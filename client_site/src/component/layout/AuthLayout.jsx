import React from 'react'
import Header from '../includ/Header'
import Sidebar from '../includ/Sidebar'
import '../../assets/admin/css/adminlte.css'
import Navbar from '../includ/Navbar';
import Footer from '../includ/Footer';

const AuthLayout = ({header,children}) => {
  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Navbar/>
        <Sidebar/>

          <div className="content-wrapper">
              <Header header={header}/>

              {/* Main content */}
              <section className="content">
                  <div className="container-fluid">{children}</div>
              </section>
          </div>

        <Footer/>
      </div>
  </div>
  )
}

export default AuthLayout