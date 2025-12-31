// src/components/pos/modals/BarcodeModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { addProduct, updateQuantity } from "../../../core/redux/cartSlice";
import { toast } from "react-toastify";
import usePos from "../../../hooks/usePos";
import { Clock, X } from "react-feather";
import { useSelector } from "react-redux";

const BarcodeModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { summary, products } = usePos();
  // Get cart items from Redux and convert cart object → array for easier processing
  const cartItems = useSelector((state) => Object.values(state.cart.items));

  const [barcode, setBarcode] = useState("");
  const [scannedProducts, setScannedProducts] = useState([]);
  const inputRef = useRef(null);

  // When modal opens → preload cart items as scanned
  useEffect(() => {
    if (show) {
      const preloaded = (cartItems || []).map((item) => ({
        ...item,
        scannedAt: item.scannedAt || new Date().toLocaleTimeString(),
      }));
      setScannedProducts([...preloaded]); // ensure fresh copy
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      setScannedProducts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // 🔹 Find category by product codex
  const findCategoryByProduct = (productCode, catList = []) => {
    if (!catList?.length) return "Uncategorized!";
    for (const cat of catList) {
      if (cat.items?.some((item) => item.code === productCode)) {
        return cat.name;
      }
    }
    return "Uncategorized";
  };

  // 🔹 Handle barcode scan or manual entry
  const handleScan = (e) => {
    e?.preventDefault();
    const trimmedCode = String(barcode).trim();

    if (!trimmedCode)
      return toast.warning("⚠️ Please scan or enter a barcode first.");

    const found = products.find(
      (p) => String(p.barcode).trim() === trimmedCode
    );

    if (!found) return toast.error("❌ Product not found!");

    const categoryName = findCategoryByProduct(found.code, summary);
    const exists = scannedProducts.find((p) => p.barcode === found.barcode);

    if (exists) {
      // ✅ If product already scanned/preloaded → increase quantity
      const updated = scannedProducts.map((p) =>
        p.barcode === found.barcode ? { ...p, quantity: p.quantity + 1 } : p
      );
      setScannedProducts(updated);
      toast.info(`🔁 ${found.name} quantity increased`);
    } else {
      // ✅ Add as new scanned item
      const newItem = {
        ...found,
        categoryName,
        quantity: 1,
        scannedAt: new Date().toLocaleTimeString(),
      };
      setScannedProducts((prev) => [...prev, newItem]);
      toast.success(`✅ ${found.name} added`);
    }

    setBarcode("");
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleScan(e);
    if (e.key === "Escape") onClose();
  };

  const handleRemove = (barcode) => {
    setScannedProducts((prev) => prev.filter((p) => p.barcode !== barcode));
  };

  // 🔹 Add all scanned products to cart
  const handleAddAllToCart = () => {
    if (!scannedProducts.length) return toast.warning("No products to add!");
    let addedCount = 0;

    scannedProducts.forEach((scanned) => {
      const existing = cartItems.find((c) => c.barcode === scanned.barcode);

      if (existing) {
        // Calculate only the difference
        const additionalQty = scanned.quantity - existing.quantity;

        if (additionalQty > 0) {
          dispatch(
            updateQuantity({
              code: existing.code,
              quantity: existing.quantity + additionalQty,
            })
          );
          addedCount++;
        }
      } else {
        // New product entirely
        dispatch(
          addProduct({
            ...scanned,
            quantity: scanned.quantity,
            scannedAt: scanned.scannedAt || new Date().toLocaleTimeString(),
          })
        );
        addedCount++;
      }
    });

    if (addedCount > 0) {
      toast.success(`🛒 ${addedCount} product(s) added/updated to cart`);
    } else {
      toast.info("ℹ️ No quantity changes to update");
    }

    setScannedProducts([]);
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered backdrop="static" keyboard>
        <Modal.Header
          className="d-flex justify-content-between align-items-center"
          // style={{
          //   background: "#d1e7dd",
          //   borderBottom: "1px solid #198754",
          // }}
          style={{
            background: "linear-gradient(135deg, #C52031, #ED1A3B)",
            color: "white",
          }}
        >
          <Modal.Title className="fw-bold d-flex text-white align-items-center gap-2 ">
            <i className="ti ti-barcode me-2"></i> Scan Product Barcode
          </Modal.Title>
          <button className="modal-close-btnx" onClick={onClose}>
            ✖
          </button>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form onSubmit={handleScan}>
            <Form.Label className="fw-semibold mb-2 text-muted">
              Scan or type a barcode
            </Form.Label>
            <InputGroup size="lg" className="shadow-sm">
              <InputGroup.Text>
                <i className="ti ti-scan" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                ref={inputRef}
                value={barcode}
                placeholder="🔍 Scan or type barcode here..."
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </InputGroup>
            <Form.Text className="text-muted mt-2 d-block">
              Press <b>Enter</b> to scan, <b>Esc</b> to close.
            </Form.Text>
          </Form>

          {scannedProducts.length > 0 && (
            <>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <span className="fw-semibold text-success">
                  ✅ Total Scanned: {scannedProducts.length}
                </span>
                <small className="text-muted">
                  Last scanned:{" "}
                  {scannedProducts[scannedProducts.length - 1]?.name}
                </small>
              </div>

              <ListGroup
                className="mt-3 border rounded shadow-sm"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {scannedProducts.map((p) => (
                  <ListGroup.Item
                    key={p.barcode}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-semibold">{p.name}</div>
                      <small className="text-muted">
                        Barcode: {p.barcode} | Category:{" "}
                        <Badge bg="info">{p.categoryName}</Badge> |{" "}
                        <Clock size={12} className="me-1" />
                        {p.scannedAt}
                      </small>
                    </div>
                    {/* <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleRemove(p.barcode)}
                  >
                    <X size={14} />
                  </Button> */}

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemove(p.barcode)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={onClose}>
            <i className="ti ti-x me-1"></i> Cancel
          </Button>
          <button
            className="btn btn-primary"
            onClick={handleAddAllToCart}
            disabled={!scannedProducts.length}
          >
            <i className="ti ti-plus me-1"></i> Add All to Cart
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BarcodeModal;

// // src/components/pos/modals/BarcodeModal.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { Modal, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
// import { addProduct } from "../../core/redux/transactionSlice";
// import { toast } from "react-toastify";
// import { X } from "react-feather";
// import usePos from "../../hooks/usePos";

// const BarcodeModal = ({ show, onClose, categories = [] }) => {
//   const dispatch = useDispatch();
//   const { products } = usePos();
//   const [barcode, setBarcode] = useState("");
//   const [scannedProducts, setScannedProducts] = useState([]);
//   const inputRef = useRef(null);
//   // Flatten all items from all categories
//   // const allProducts = categories?.flatMap(
//   //   (cat) =>
//   //     cat.items?.map((item) => ({
//   //       ...item,
//   //       categoryCode: cat.code,
//   //       categoryName: cat.name,
//   //     })) || []
//   // );

//   console.log("scannedProducts", scannedProducts);
//   console.log("products", products);

//   useEffect(() => {
//     if (show && inputRef.current) {
//       setTimeout(() => inputRef.current.focus(), 150);
//     }
//   }, [show]);

//   // const handleScan = (e) => {
//   //   e.preventDefault();
//   //   const trimmedCode = String(barcode).trim();

//   //   if (!trimmedCode) return toast.warning("⚠️ Please scan or enter a barcode first.");

//   //   const found = allProducts.find((p) => String(p.barcode).trim() === trimmedCode);

//   //   if (found) {
//   //     dispatch(addProduct(found));
//   //     toast.success(`✅ ${found.name} added to cart`);
//   //     setBarcode("");
//   //     onClose();
//   //   } else {
//   //     toast.error("❌ Product not found!");
//   //   }
//   // };

//   // Scan / type barcode
//   const handleScan = (e) => {
//     e?.preventDefault();
//     const trimmedCode = String(barcode).trim();
//     if (!trimmedCode)
//       return toast.warning("⚠️ Please scan or enter a barcode first.");

//     console.log("trimmedCode in scan", trimmedCode);

//     // Find product in flat product list
//     const found = products.find(
//       (p) => String(p.barcode).trim() === trimmedCode
//     );
//     if (!found) return toast.error("❌ Product not found!");

//     // Prevent duplicate scans in temporary list
//     if (scannedProducts.find((p) => p.barcode === found.barcode)) {
//       toast.info(`⚠️ ${found.name} already scanned`);
//       setBarcode("");
//       return;
//     }
//     // Add product to local scanned list
//     setScannedProducts((prev) => [...prev, found]);
//     setBarcode("");
//     toast.success(`✅ ${found.name} added to scan list`);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleScan(e);
//     }
//   };

//   const handleRemove = (barcode) => {
//     setScannedProducts((prev) => prev.filter((p) => p.barcode !== barcode));
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={onClose}
//       centered
//       backdrop="static"
//       keyboard={true}
//     >
//       <Modal.Header className="d-flex justify-content-between align-items-center">
//         <Modal.Title>
//           <i className="ti ti-barcode me-2"></i> Scan or Enter Barcode
//         </Modal.Title>
//         <button
//           type="button"
//           className="btn btn-sm btn-danger remove-image-button"
//           aria-label="Close"
//           onClick={onClose}
//         >
//           <X size={12} />
//         </button>
//       </Modal.Header>

//       <Modal.Body className="p-4">
//         <Form onSubmit={handleScan}>
//           <Form.Label className="fw-semibold mb-2">
//             Enter or Scan Product Barcode
//           </Form.Label>
//           <InputGroup size="lg">
//             <InputGroup.Text>
//               <i className="ti ti-scan" />
//             </InputGroup.Text>
//             <Form.Control
//               type="text"
//               ref={inputRef}
//               value={barcode}
//               placeholder="🔍 Scan or type barcode here..."
//               onChange={(e) => setBarcode(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="barcode-input shadow-sm"
//             />
//           </InputGroup>
//           <Form.Text className="text-muted mt-2 d-block">
//             Tip: Use a barcode scanner or type manually and press <b>Enter</b>.
//           </Form.Text>
//         </Form>
//         {scannedProducts.length > 0 && (
//           <ListGroup
//             className="mt-3"
//             style={{ maxHeight: "250px", overflowY: "auto" }}
//           >
//             {scannedProducts.map((p) => (
//               <ListGroup.Item
//                 key={p.barcode}
//                 className="d-flex justify-content-between align-items-center"
//               >
//                 <div>
//                   {p.name} <small className="text-muted">({p.barcode})</small>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => handleRemove(p.barcode)}
//                 >
//                   Remove
//                 </Button>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Modal.Body>

//       <Modal.Footer className="d-flex justify-content-between">
//         <Button variant="outline-secondary" onClick={onClose}>
//           <i className="ti ti-x me-1"></i> Cancel
//         </Button>
//         <Button variant="primary" onClick={handleScan}>
//           <i className="ti ti-plus me-1"></i> Add to Cart
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default BarcodeModal;

// const handleAddAllToCart = () => {
//   if (!scannedProducts.length) return toast.warning("No products to add!");

//   scannedProducts.forEach((scanned) => {
//     const existing = cartItems.find((c) => c.barcode === scanned.barcode);
//     if (existing) {
//       dispatch(updateQuantity({ barcode: scanned.barcode, quantity: existing.quantity + 1 }));
//     } else {
//       dispatch(addProduct(scanned));
//     }
//   });

//   toast.success(`🛒 ${scannedProducts.length} products added/updated to cart`);
//   setScannedProducts([]);
//   onClose();
// };
