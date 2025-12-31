import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerLoyality = ({ customer }) => {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    setShowAlert(true);
  }, [customer]);

  if (!customer) return null;

  const bonus = customer.bonus || 0;
  const loyalty = customer.loyalty || 0;
  const isDisabled = bonus === 0 && loyalty === 0;

  return (
    showAlert && (
      <div className="customer-item border border-orange bg-orange-100 d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
        <div>
          <h6 className="fs-16 fw-bold mb-1">{customer.name}</h6>
          <div className="d-inline-flex align-items-center gap-2 customer-bonus">
            <p className="fs-13 d-inline-flex align-items-center gap-1">
              Bonus :
              <span className="badge bg-cyan fs-13 fw-bold p-1">{bonus}</span>{" "}
            </p>
            <p className="fs-13 d-inline-flex align-items-center gap-1">
              Loyality :
              <span className="badge bg-teal fs-13 fw-bold p-1">
                ₹{loyalty}
              </span>{" "}
            </p>
          </div>
        </div>
        <Link
          to="#"
          className={`btn btn-orange btn-sm ${isDisabled ? "disabled" : ""}`}
          onClick={(e) => {
            if (isDisabled) e.preventDefault();
            else console.log("Loyalty applied for", customer.name);
          }}
        >
          Apply
        </Link>
        <Link to="#" className="close-icon" onClick={() => setShowAlert(false)}>
          <i className="ti ti-x" />
        </Link>
      </div>
    )
  );
};

export default CustomerLoyality;
