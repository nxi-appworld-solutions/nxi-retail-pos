import React, { useState } from "react";
import { PlusCircle, X, Image as ImageIcon } from "react-feather";
import { Link } from "react-router-dom";

const ProductImages = ({
  images,
  setImages,
  handleImageChange,
  handleRemoveImage,
  isLoading,
}) => {
  return (
    <div className="accordion-item border mb-4">
      <h2 className="accordion-header" id="headingSpacingThree">
        <div
          className="accordion-button collapsed bg-white"
          data-bs-toggle="collapse"
          data-bs-target="#SpacingThree"
          aria-expanded="true"
          aria-controls="SpacingThree"
        >
          <h5 className="d-flex align-items-center">
            <ImageIcon className="text-primary me-2" />
            <span>Images</span>
          </h5>
        </div>
      </h2>

      <div
        id="SpacingThree"
        className="accordion-collapse collapse show"
        aria-labelledby="headingSpacingThree"
      >
        <div className="accordion-body border-top">
          <div className="text-editor add-list add">
            <div className="col-lg-12">
              <div className="add-choosen">
                <div className="mb-3">
                  <div className="image-upload">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isLoading}
                      className="form-control"
                    />
                    <div className="image-uploads">
                      <PlusCircle className="plus-down-add me-0" />
                      <h4>Add Images</h4>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  {images.map((img, index) => (
                    <div className="phone-img position-relative" key={index}>
                      <img
                        src={img.preview}
                        alt={`preview-${index}`}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                      <Link
                        to="#"
                        className="position-absolute" // top-0 end-0
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
