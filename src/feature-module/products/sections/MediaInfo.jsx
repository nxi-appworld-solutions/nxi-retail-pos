import React from "react";
import { Image, Barcode, QrCode } from "react-feather";

const MediaInfo = ({ formData, handleChange }) => {
  const handleFile = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    handleChange({ target: { name: "image", value: file } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      <div className="col-md-6">
        <label className="form-label fw-bold">
          <Image size={14} className="me-1" />
          Product Image
        </label>
        <input
          type="file"
          className="form-control"
          onChange={handleFile}
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            className="mt-3 rounded shadow-sm"
            style={{ maxHeight: "180px" }}
          />
        )}
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold">
          <Barcode size={14} className="me-1" />
          Barcode Preview
        </label>
        <div className="p-3 bg-light border rounded-4 text-center">
          <small className="text-muted d-block">
            {formData.barcode || "No Barcode"}
          </small>
          <Barcode size={48} className="mt-2 text-primary" />
        </div>
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold">
          <QrCode size={14} className="me-1" />
          QR Code
        </label>
        <div className="p-3 bg-light border rounded-4 text-center">
          <QrCode size={48} className="text-success" />
          <small className="text-muted d-block mt-1">
            Product + Price
          </small>
        </div>
      </div>
    </div>
  );
};

export default MediaInfo;
