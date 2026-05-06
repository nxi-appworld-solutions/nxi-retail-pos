import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeProduct } from "../../../core/redux/store/cartSlice";
import { truncateText } from "../../../utils/common";
import CartCounter from "../../../components/counter/counter";
import toast from "react-hot-toast";

const OrderTable = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state?.cart || {});
  const products = Object?.values(items || {});
  const itemCount = Object?.values(items || {}).length;

  return (
    <>
      <div className="head-text d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <h5 className="me-2">Order Details</h5>
          <div className="badge bg-light text-gray-9 fs-12 fw-semibold py-2 border rounded">
            Items : <span className="text-teal">{itemCount}</span>
          </div>
        </div>
        <Link
          to="#"
          className="d-flex align-items-center clear-icon fs-10 fw-medium"
          // onClick={() => {
          //   dispatch(clearCart());
          //   toast.info("All items cleared!");
          // }}
          onClick={() => {
            if (window.confirm("Are you sure you want to clear all items?")) {
              dispatch(clearCart());
              toast.success("Cart cleared successfully!");
            }
          }}
        >
          Clear all
        </Link>
      </div>
      <div className="product-wrap">
        <div className="product-list border-0 p-0">
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th className="fw-bold bg-light">Item</th>
                  <th className="fw-bold bg-light">Qty</th>
                  <th className="fw-bold bg-light text-end">Price</th>
                  <th className="fw-bold bg-light text-end">Cost</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item) => (
                  <tr key={item.code}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="delete-icon"
                          onClick={() => dispatch(removeProduct(item.code))}
                        >
                          <i className="ti ti-trash-x-filled" />
                        </Link>
                        <h6 className="fs-13 fw-normal">
                          <Link to="#" className=" link-default">
                            {truncateText(item?.name, 25)}
                          </Link>
                        </h6>
                      </div>
                    </td>
                    <td>
                      <div className="qty-item m-0">
                        <CartCounter
                          item={item.code}
                          defaultValue={item.quantity || 1}
                        />
                      </div>
                    </td>
                    <td className="fs-13 text-gray-9 text-end">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="fs-13 fw-semibold text-gray-9 text-end">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* <tfoot>
                <tr className="fw-bold border-top">
                  <td colSpan={2}>Total</td>
                  <td className="text-end">₹{total.toFixed(2)}</td>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
