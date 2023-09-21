import React from 'react'
import AuthLayout from '../layout/AuthLayout'

const Dashboard = () => {
  return (
    <AuthLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
      </h2>
  }
    >
    <div>Dashboard  Page</div>
  </AuthLayout>
  )
}

export default Dashboard