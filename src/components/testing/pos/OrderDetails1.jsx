import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCharges } from "../../../core/redux/cartSlice";

import CustomerSelect from "../../pos/CustomerSelect";
import OrderHeader from "../../pos/OrderHeader";
import CustomerLoyality from "../../pos/CustomerLoyality";
import OrderTable from "../../pos/OrderTable";
import PaymentSummary from "../../pos/PaymentSummary";
import PaymentMethods from "../../pos/PaymentMethods";
import OrderPlaceButton from "../../pos/OrderPlaceButton";
import DiscountSummary from "../../pos/DiscountSummary";
import AlertModal from "../../../components/modals/pos/alertModal";
import CashPaymentModal from "../../../components/modals/pos/cashPaymentModal";
import OnlinePaymentModal from "../../../components/modals/pos/onlinePaymentModal";
import OrderConfirmationModal from "../../../components/modals/pos/orderConfirmationModal";

import useDiscounts from "../../../hooks/useDiscounts";
import usePos from "../../../hooks/usePos";
import { toast } from "react-toastify";
import { buildOrderPayload } from "../../../utils/buildOrderPayload";
import PaymentLoader from "../../../components/loader/pos/paymentLoader";

const OrderDetails1 = ({ categories }) => {
  const dispatch = useDispatch();
  const { loading, saveFinalOrder } = usePos();

  const { items, total, totalPayable } = useSelector((state) => state.cart);
  const products = useMemo(() => Object.values(items), [items]);
  const charges = useSelector(selectCharges);
  const { discountAmount, discountText } = useDiscounts(products);

  // -------------------------
  // Local UI States
  // -------------------------
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [confirmationStatus, setConfirmationStatus] = useState("success");

  const [cashReceived, setCashReceived] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // ------------------------
  // Build payload
  // ------------------------
  const currentPayload = useMemo(() => {
    if (!selectedPayment) return null;
    return buildOrderPayload(
      selectedCustomer,
      products,
      totalPayable,
      selectedPayment
    );
  }, [selectedCustomer, products, totalPayable, selectedPayment]);

  // -------------------------
  // Helper: Final Response Handler
  // -------------------------
  const handleOrderFinalResponse = (success, data, error) => {
    if (success) {
      setConfirmationStatus("success");
      setConfirmationData(data);
    } else {
      setConfirmationStatus("failed");
      setConfirmationData({ error: error || "Order failed." });
    }
    setConfirmationOpen(true);
  };

  // ------------------------
  // Cash Payment
  // ------------------------
  const handleConfirmCashPayment = async () => {
    const remaining = cashReceived - total;

    if (remaining < 0) {
      setAlertMessage("Received amount is less than total!");
      setShowAlert(true);
      return;
    }

    // const payload = buildOrderPayload(
    //   selectedCustomer,
    //   products,
    //   totalPayable,
    //   "cash"
    // );

    // console.log("payload", payload);

    const res = await saveFinalOrder(currentPayload);
    setPaymentModalOpen(false);
    handleOrderFinalResponse(
      res.success || res.queued,
      res.data,
      res.error?.message
    );
  };

  // ------------------------
  // Place Order Flow
  // ------------------------
  const handlePlaceOrder = () => {
    if (!selectedPayment)
      return toast.warning("Please select a payment method first");

    if (!currentPayload) return toast.error("Could not prepare order payload");

    setPaymentModalOpen(true);
  };

  return (
    <>
      <PaymentLoader isLoading={loading} message="Processing Order..." />
      <aside className="product-order-list bg-secondary-transparent flex-fill">
        <div className="card">
          <div className="card-body">
            <OrderHeader />
            <div className="customer-info block-section">
              <CustomerSelect onCustomerSelect={setSelectedCustomer} />
              <CustomerLoyality customer={selectedCustomer} />
            </div>
            <div className="product-added block-section">
              <OrderTable />
              <DiscountSummary
                discountAmount={discountAmount}
                discountText={discountText}
                onRemove={() => toast.info("Discount removed (if applicable)")}
              />
            </div>
            <PaymentSummary />
          </div>
        </div>
        {/* Payment Area */}
        {products.length > 0 && (
          <>
            {/* 🔹 Select Payment Method */}
            <PaymentMethods
              selectedPayment={selectedPayment}
              onSelect={setSelectedPayment}
            />
            <OrderPlaceButton
              onPlaceOrder={handlePlaceOrder}
              disabled={loading}
            />
          </>
        )}
        {/* Cash Payment Modal */}
        <CashPaymentModal
          show={isPaymentModalOpen && selectedPayment === "cash"}
          setShow={setPaymentModalOpen}
          cashReceived={cashReceived}
          setCashReceived={setCashReceived}
          total={total}
          change={cashReceived - total}
          onConfirm={handleConfirmCashPayment}
          customer={selectedCustomer}
          loading={loading}
        />
        {/* Online Payment Modal */}
        <OnlinePaymentModal
          show={isPaymentModalOpen && selectedPayment === "online"}
          setShow={setPaymentModalOpen}
          orderPayload={currentPayload}
          loading={loading}
          onPaymentComplete={(ok, data, err) =>
            handleOrderFinalResponse(ok, data, err)
          }
        />

        {/* Alert Modal */}
        <AlertModal
          show={showAlert}
          setShow={setShowAlert}
          type="warning"
          title="Invalid Amount"
          message={alertMessage}
          footerButtons={[{ label: "OK", variant: "primary" }]}
        />
        <OrderConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          orderStatus={confirmationStatus}
          orderData={confirmationData}
          onResetCart={() => dispatch(clearCart())}
        />
      </aside>
    </>
  );
};

export default OrderDetails1;
