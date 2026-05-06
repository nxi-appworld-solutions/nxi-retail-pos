import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartTotal, selectCharges, selectTotalPayable, updateCharges } from "../../../core/redux/store/cartSlice";


const PaymentSummary = () => {
  const dispatch = useDispatch();
  const charges = useSelector(selectCharges);
  const total = useSelector(selectCartTotal);
  const totalPayable = useSelector(selectTotalPayable);

  // console.log("totalPayable", totalPayable)
  const handleEdit = (key) => {
    const newValue = parseFloat(prompt(`Enter new ${key} value:`));
    if (!isNaN(newValue)) {
      dispatch(updateCharges({ key, value: newValue }));
    }
  };

  return (
    <div className="order-total bg-total bg-white p-0">
      <h5 className="mb-3">Payment Summary</h5>
      <table className="table table-responsive table-borderless">
        <tbody>
          {Object.entries(charges).map(([key, value]) => (
            <tr key={key}>
              <td>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <Link
                  to="#"
                  className="ms-3 link-default"
                  onClick={() => handleEdit(key)}
                >
                  <i className="ti ti-edit" />
                </Link>
              </td>
              <td className="text-gray-9 text-end">₹{value}</td>
            </tr>
          ))}

          <tr>
            <td>Sub Total</td>
            <td className="text-gray-9 text-end">₹{total.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="fw-bold border-top border-dashed">Total Payable</td>
            <td className="text-gray-9 fw-bold text-end border-top border-dashed">
              ₹{totalPayable.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSummary;
