/* eslint-disable no-empty */
import React, { useEffect, useRef } from "react";
import "./paymentProcessing.css";

export default function PaymentProcessing({ isLoading = false }) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto play
    try {
      audioRef.current?.play().catch(() => {});
    } catch {}

    return () => {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current?.pause();
      } catch {}
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="processing-overlay-pro">
      <div className="processing-card scale-in">
        {/* Modern ring loader */}
        <div className="ring-loader">
          <div className="inner-ring" />
        </div>

        <h2 className="title fade-up">Processing Payment...</h2>
        <p className="subtitle fade-up-delayed">
          Please wait while we securely confirm your transaction
        </p>

        <div className="progress-bar">
          <div className="progress-fill" />
        </div>
      </div>

      <audio ref={audioRef} preload="auto">
        <source src="/sounds/success.mp3" type="audio/mpeg" />
      </audio>

      {/* Ambient floating particles */}
      <div className="particles-wrapper">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
    </div>
  );
}
