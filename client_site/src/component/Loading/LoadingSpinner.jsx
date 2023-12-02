import React from 'react';
import './LoadingSpinner.css'; // Import a CSS file for styling

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      {/* Add your loading animation here */}
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
