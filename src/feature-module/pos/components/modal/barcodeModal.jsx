import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock } from "react-feather";
import toast from "react-hot-toast";
import BaseModal from "../../../../core/common/modal/baseModal";
import Loader from "../../../../components/loader/Loader";
import usePos from "../../../../core/hooks/usePos";

import {
  addProduct,
  updateQuantity,
} from "../../../../core/redux/store/cartSlice";
import useModal from "../../../../routes/modal_root/useModal";

const BarcodeModal = () => {
  const dispatch = useDispatch();

  // =====================================================
  // MODAL
  // =====================================================
  const { close } = useModal();

  // =====================================================
  // POS DATA
  // =====================================================
  const { summary, products } = usePos();

  // =====================================================
  // CART
  // =====================================================
  const cartItems = useSelector((state) =>
    Object.values(state?.cart?.items || {}),
  );

  // =====================================================
  // STATE
  // =====================================================
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [scannedProducts, setScannedProducts] = useState([]);

  const inputRef = useRef(null);

  // =====================================================
  // MODAL LOAD
  // =====================================================
  useEffect(() => {
    const preloaded = (cartItems || []).map((item) => ({
      ...item,
      scannedAt: item.scannedAt || new Date().toLocaleTimeString(),
    }));

    setScannedProducts(preloaded);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => {
      setBarcode("");
      setScannedProducts([]);
    };
  }, []);

  // =====================================================
  // FIND CATEGORY
  // =====================================================
  const findCategoryByProduct = (productCode, categories = []) => {
    for (const cat of categories) {
      if (cat.items?.some((x) => x.code === productCode)) {
        return cat.name;
      }
    }

    return "Uncategorized";
  };

  // =====================================================
  // HANDLE SCAN
  // =====================================================
  const handleScan = (e) => {
    e?.preventDefault();

    const trimmedCode = String(barcode).trim();

    if (!trimmedCode) {
      toast.error("Please scan barcode");
      return;
    }

    const found = products.find(
      (p) => String(p.barcode).trim() === trimmedCode,
    );

    if (!found) {
      toast.error("Product not found");
      return;
    }

    const categoryName = findCategoryByProduct(found.code, summary);

    const exists = scannedProducts.find((x) => x.barcode === found.barcode);

    // =================================================
    // UPDATE EXISTING
    // =================================================
    if (exists) {
      const updated = scannedProducts.map((x) =>
        x.barcode === found.barcode
          ? {
              ...x,
              quantity: x.quantity + 1,
            }
          : x,
      );

      setScannedProducts(updated);

      toast.success(`${found.name} quantity updated`);
    }

    // =================================================
    // NEW ITEM
    // =================================================
    else {
      setScannedProducts((prev) => [
        ...prev,
        {
          ...found,
          quantity: 1,
          categoryName,
          scannedAt: new Date().toLocaleTimeString(),
        },
      ]);

      toast.success(`${found.name} scanned`);
    }

    setBarcode("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // =====================================================
  // REMOVE PRODUCT
  // =====================================================
  const handleRemove = (barcode) => {
    setScannedProducts((prev) => prev.filter((x) => x.barcode !== barcode));
  };

  // =====================================================
  // ADD TO CART
  // =====================================================
  const handleAddAllToCart = () => {
    if (!scannedProducts.length) {
      toast.error("No scanned products");
      return;
    }

    scannedProducts.forEach((scanned) => {
      const existing = cartItems.find((x) => x.barcode === scanned.barcode);

      // ===============================================
      // UPDATE
      // ===============================================
      if (existing) {
        const additionalQty = scanned.quantity - existing.quantity;

        if (additionalQty > 0) {
          dispatch(
            updateQuantity({
              code: existing.code,
              quantity: existing.quantity + additionalQty,
            }),
          );
        }
      }

      // ===============================================
      // ADD NEW
      // ===============================================
      else {
        dispatch(
          addProduct({
            ...scanned,
          }),
        );
      }
    });

    toast.success("Products added to cart");

    close();
  };

  // =====================================================
  // KEY EVENTS
  // =====================================================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleScan(e);
    }

    if (e.key === "Escape") {
      close();
    }
  };

  return (
    <>
      {loading && <Loader loading />}

      <BaseModal
        title="Scan Product Barcode"
        size="lg"
        footer={
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!scannedProducts.length}
              onClick={handleAddAllToCart}
            >
              Add All to Cart
            </button>
          </div>
        }
      >
        <div className="new-employee-field">
          {/* BARCODE INPUT */}
          <form onSubmit={handleScan}>
            <div className="mb-3">
              <label className="form-label">Scan Barcode</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="ti ti-scan"></i>
                </span>

                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  value={barcode}
                  placeholder="Scan or type barcode..."
                  onChange={(e) => setBarcode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>

              <small className="text-muted">Press Enter to scan</small>
            </div>
          </form>

          {/* PRODUCTS */}
          {scannedProducts.length > 0 && (
            <>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0">
                  Total Scanned: {scannedProducts.length}
                </h6>

                <small className="text-muted">
                  Last: {scannedProducts[scannedProducts.length - 1]?.name}
                </small>
              </div>

              <div
                className="border rounded overflow-auto"
                style={{ maxHeight: "350px" }}
              >
                {scannedProducts.map((p) => (
                  <div
                    key={p.barcode}
                    className="d-flex align-items-center justify-content-between p-3 border-bottom"
                  >
                    <div>
                      <h6 className="mb-1 fs-14 fw-semibold">{p.name}</h6>

                      <div className="text-muted fs-12">
                        Barcode: {p.barcode}
                      </div>

                      <div className="text-muted fs-12">
                        Category: {p.categoryName}
                      </div>

                      <div className="text-muted fs-12">
                        <Clock size={12} className="me-1" />
                        {p.scannedAt}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <span className="badge bg-primary">
                        Qty: {p.quantity}
                      </span>

                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemove(p.barcode)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </BaseModal>
    </>
  );
};

export default BarcodeModal;
