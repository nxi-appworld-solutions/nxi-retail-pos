import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedCustomer } from "../../../core/redux/store/posOrderSlice";

import { MODAL_TYPES } from "../../../routes/modal_root/modalTypes";

import QuickActions from "./customer/QuickActions";
import CustomerSelectDropdown from "./customer/CustomerSelectDropdown";
import useModal from "../../../routes/modal_root/useModal";
import useCustomers from "../../../core/hooks/useCustomers";
import useAppModal from "../../../core/common/modal/useAppModal";

const CustomerSelect = () => {
  const dispatch = useDispatch();
  const { open } = useAppModal();

  const cartItems = useSelector((state) => state?.cart?.items || {});

  const selectedCustomer = useSelector(
    (state) => state?.posOrder?.selectedCustomer || null,
  );

  const { customers, loading } = useCustomers();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (customers?.length > 0) {
      const customerOptions = customers.map((c) => ({
        value: c.code,
        label: c.name,
      }));

      const finalOptions = [
        {
          value: "walkInCustomer",
          label: "Walk in Customer",
        },
        ...customerOptions,
      ];

      setOptions(finalOptions);
    } else {
      setOptions([
        {
          value: "walkInCustomer",
          label: "Walk in Customer",
        },
      ]);
    }
  }, [customers]);

  // =====================================================
  // CUSTOMER CHANGE
  // =====================================================
  const handleCustomerChange = (opt) => {
    if (opt.value === "walkInCustomer") {
      dispatch(setSelectedCustomer(null));
      return;
    }

    const found = customers.find((c) => c.code === opt.value);

    dispatch(setSelectedCustomer(found || null));
  };

  // =====================================================
  // OPEN BARCODE
  // =====================================================
  const handleOpenBarcode = () => {
    const cartCount = Object.keys(cartItems).length;

    console.log("Cart has items:", cartCount);
    // ===============================================
    // CART HAS ITEMS
    // ===============================================
    // if (cartCount > 0) {
    //   open(MODAL_TYPES.POS_CART_WARNING, {
    //     confirmMessage: `Your cart already has ${cartCount} items.`,
    //   });

    //   return;
    // }

    // ===============================================
    // OPEN BARCODE
    // ===============================================
    open(MODAL_TYPES.POS_BARCODE);
  };

  return (
    <div>
      <h5 className="mb-2">Customer Information</h5>

      <div className="d-flex align-items-center gap-2">
        <CustomerSelectDropdown
          options={options}
          selected={selectedCustomer}
          loading={loading}
          onChange={handleCustomerChange}
        />

        <QuickActions
          onFind={() => open(MODAL_TYPES.POS_CUSTOMER)}
          onAdd={() => open(MODAL_TYPES.CUSTOMER)}
          onScan={handleOpenBarcode}
        />
      </div>
    </div>
  );
};

export default CustomerSelect;
