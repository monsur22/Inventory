import React from 'react'
import AuthLayout from '../component/layout/AuthLayout'

const NewPage = () => {
  return (
    <AuthLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          New Page
      </h2>
  }
    >
    <div>NewPage</div>

    </AuthLayout>
  )
}

export default NewPage
