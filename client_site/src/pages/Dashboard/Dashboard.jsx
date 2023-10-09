import React, { Suspense, useEffect, useState } from 'react'
import AuthLayout from '../../component/layout/AuthLayout'
import LoadingSpinner from '../../component/Loading/LoadingSpinner';
import WithLoading from '../../component/Loading/LoadingHOC'; // Import the HOC
import useLoading from '../../component/Loading/useLoading'; // Import the custom hook

const Dashboard = () => {
    const isLoading = useLoading();

    return (
    <AuthLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
      </h2>
  }
    >
        {isLoading ? <LoadingSpinner /> : <div>Dashboard Page</div>}


  </AuthLayout>

  )
}

export default Dashboard

// export default WithLoading(Dashboard); // Wrap your component with the HOC
