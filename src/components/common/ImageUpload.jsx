import React, { useEffect, useRef, useState } from "react";
import { X } from "react-feather";

const ImageUpload = ({
  onChange,
  initialImage = null,
  label = "Upload Image",
}) => {
  const [image, setImage] = useState(initialImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        if (onChange) onChange(file, reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be less than 2 MB");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onChange) onChange(null, null);
  };

  return (
    <div className="new-employee-field">
      <div className="profile-pic-upload">
        <div className="profile-pic">
          {image ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img src={image} alt="Preview" />
              <button
                type="button"
                className="btn btn-sm btn-danger remove-image-button"
                onClick={handleRemoveImage}
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <span>
              <i data-feather="plus-circle" className="plus-down-add" /> Add
              Image
            </span>
          )}
        </div>

        <div className="mb-3">
          <div className="image-upload mb-0">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              required={!image}
            />
            <div className="image-uploads">
              <h4>{label}</h4>
            </div>
          </div>
          <p className="mt-2">JPEG, PNG up to 2 MB</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
