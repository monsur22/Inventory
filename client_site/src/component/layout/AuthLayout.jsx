import React from 'react'
import Header from '../includ/Header'
import Sidebar from '../includ/Sidebar'
const AuthLayout = ({children}) => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <main className="content">{children}</main>
      </div>
    </div>
  )
}

export default AuthLayout