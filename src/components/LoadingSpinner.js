import React from 'react'

const LoadingSpinner = ({ message = "Yükleniyor..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
