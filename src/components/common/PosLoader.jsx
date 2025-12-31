import React from 'react';

const PosLoader = ({ loading, type = 'dots', message = 'Processing...' }) => {
  if (!loading) {
    return null;
  }

  // लोडर का प्रकार चुनें
  const LoaderType = () => {
    switch (type) {
      case 'scanner':
        return (
          <div className="pos-scanner-loader-container">
            {/* The line will animate inside the box */}
            <div className="pos-scanner-box"></div>
            <div className="pos-scanner-line"></div>
          </div>
        );
      case 'dots':
      default:
        return (
          <div className="pos-dots-loader-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
    }
  };

  return (
    <div className="pos-loader-overlay">
      <div className="pos-loader-content">
        <LoaderType />
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};

export default PosLoader;
