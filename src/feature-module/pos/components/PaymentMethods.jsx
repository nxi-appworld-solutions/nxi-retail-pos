import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedPayment } from "../../../core/redux/store/posOrderSlice";
import { cashIcon, card } from "../../..//utils/imagepath";

const paymentOptions = [
  {
    name: "Cash",
    icon: cashIcon,
    type: "cash",
    target: "#payment-cash",
  },
  {
    name: "Online",
    icon: card,
    type: "online",
    target: "#payment-card",
  },
];

const PaymentMethods = ({ onCash, onOnline }) => {
  const dispatch = useDispatch();

  const selectedPayment = useSelector(
    (state) => state?.posOrder?.selectedPayment || null,
  );

  return (
    <div className="card payment-method">
      <div className="card-body">
        <h5 className="mb-3">Select Payment</h5>
        <div className="row align-items-center methods g-2">
          {paymentOptions.map(({ name, icon, type }, i) => (
            <div key={i} className="col-sm-12 col-md-6 d-flex">
              <Link
                to="#"
                className={`payment-item d-flex align-items-center justify-content-center p-2 flex-fill ${
                  selectedPayment === type ? "active" : ""
                }`}
                onClick={() => {
                  dispatch(setSelectedPayment(type));
                  if (type === "cash") onCash?.();
                  if (type === "online") onOnline?.();
                }}
              >
                <img src={icon} className="me-2" alt={name} />
                <p className="fs-14 fw-medium">{name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
