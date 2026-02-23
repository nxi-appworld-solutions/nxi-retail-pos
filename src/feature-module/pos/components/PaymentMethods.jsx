import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedPayment } from "../../../core/redux/posOrderSlice";

const paymentOptions = [
  {
    name: "Cash",
    icon: "cash-icon.svg",
    type: "cash",
    target: "#payment-cash",
  },
  { name: "Online", icon: "card.svg", type: "online", target: "#payment-card" },
  // { name: "Points", icon: "points.svg", target: "#payment-points" },
  // { name: "Deposit", icon: "deposit.svg", target: "#payment-deposit" },
  // { name: "Cheque", icon: "cheque.svg", target: "#payment-cheque" },
  // { name: "Gift Card", icon: "giftcard.svg", target: "#gift-payment" },
  // { name: "Scan", icon: "scan-icon.svg", target: "#scan-payment" },
  // { name: "Pay Later", icon: "paylater.svg" },
  // { name: "External", icon: "external.svg" },
  // { name: "Split Bill", icon: "split-bill.svg", target: "#split-payment" },
];

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const selectedPayment = useSelector((state) => state.posOrder.selectedPayment);

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
                onClick={() => dispatch(setSelectedPayment(type))}
              >
                <img
                  src={`assets/img/icons/${icon}`}
                  className="me-2"
                  alt={name}
                />
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
