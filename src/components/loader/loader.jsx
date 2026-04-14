import React from "react";

const Loader = ({ loading = false, fullScreen = true, size = 50 }) => {
  if (!loading) return null;

  return (
    <>
      <style>{`
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loader-spinner {
          border: 4px solid #eee;
          border-top: 4px solid #28a745;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className={fullScreen ? "loader-overlay" : ""}>
        <div className="loader-spinner" style={{ width: size, height: size }} />
      </div>
    </>
  );
};

export default Loader;
