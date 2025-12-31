import React from "react";
import { Link } from "react-router-dom";
import TextEditor from "../inventory/texteditor";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Select } from "antd";

const importproduct = () => {
  return (
    <>
      {/* Import Product */}
      <div className="modal fade" id="view-notes">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Import Product</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="modal-top">
                      <div className="row">
                        <div className="col-12">
                          <div className="input-blocks">
                            <label>
                              Product
                              <span className="ms-1 text-danger">*</span>
                            </label>
                            <Select
                              classNamePrefix="react-select"
                              options={products}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="input-blocks">
                            <label>
                              Category
                              <span className="ms-1 text-danger">*</span>
                            </label>
                            <Select
                              classNamePrefix="react-select"
                              options={Category}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="input-blocks">
                            <label>
                              Sub Category
                              <span className="ms-1 text-danger">*</span>
                            </label>
                            <Select
                              classNamePrefix="react-select"
                              options={SubCategory}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-sm-6 col-12">
                          <div className="row">
                            <div>
                              <div className="modal-footer-btn download-file">
                                <Link to="#" className="btn btn-submit">
                                  Download Sample File
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-blocks image-upload-down">
                            <label> Upload CSV File</label>
                            <div className="image-upload download">
                              <input type="file" />
                              <div className="image-uploads">
                                <ImageWithBasePath
                                  src="assets/img/download-img.png"
                                  alt="img"
                                />
                                <h4>
                                  Drag and drop a <span>file to upload</span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-sm-6 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Created by
                              <span className="ms-1 text-danger">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3 input-blocks">
                            <label className="form-label">Description</label>
                            <TextEditor />
                            <p className="mt-1">Maximum 60 Characters</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-btns">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="modal-footer-btn">
                            <button
                              type="button"
                              className="btn btn-cancel me-2 p-2 px-3"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <Link
                              to="#"
                              className="btn btn-submit p-2 px-3"
                              data-bs-dismiss="modal"
                            >
                              Submit
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Import Product */}
    </>
  );
};

export default importproduct;
