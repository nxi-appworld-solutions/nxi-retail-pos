// GlobalLoaderOverlay.jsx
import React from "react";
import { Spinner } from "react-bootstrap";

const overlayStyle = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.9)",
  zIndex: 1000,
  flexDirection: "column",
  gap: 10,
  padding: 16,
  textAlign: "center",
};

export default function GlobalLoaderOverlay({ visible, message, small = false }) {
  if (!visible) return null;

  return (
    <div style={overlayStyle} aria-live="polite" role="status">
      <Spinner animation="border" role="status" />
      <div style={{ fontSize: small ? 13 : 14, fontWeight: 600, color: "#222" }}>
        {message || "Processing..."}
      </div>
    </div>
  );
}
