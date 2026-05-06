import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../../core/redux/store/cartSlice";
import CartCounter from "../../../components/counter/counter";
// import VegIcon from "../../../components/common/vegIcon";
// import NonVegIcon from "../../../components/common/nonVegIcon";

const ProductGrid = ({ products = [], activeTab }) => {
  console.log("Rendering ProductGrid with products:", products);

  const cartItems = useSelector((state) => state?.cart?.items || {});
  const dispatch = useDispatch();
  const location = useLocation();

  // const handleToggle = (product, isOutOfStock) => {
  //   if (isOutOfStock) return; // ❌ block click

  //   if (cartItems[product.code]) {
  //     dispatch(removeProduct(product.code));
  //   } else {
  //     dispatch(addProduct(product));
  //   }
  // };

  const handleToggle = (product, isOutOfStock) => {
    if (isOutOfStock) return;

    const code = String(product?.code);

    if (!code) {
      console.warn("❌ Invalid product code", product);
      return;
    }

    console.log("cartItems:", cartItems);
    console.log("code:", code);
    console.log("existing:", cartItems?.[code]);

    if (cartItems?.[code]) {
      console.log("Removing product");
      dispatch(removeProduct(code));
    } else {
      console.log("Adding product");
      dispatch(addProduct(product));
    }
  };

  useEffect(() => {
    document.body.classList.add("pos-page");
    return () => document.body.classList.remove("pos-page");
  }, [location.pathname]);

  return (
    <div className="pos-products">
      <div className="tabs_container">
        <div className="tab_content active" data-tab={activeTab}>
          <div className="product-grid">
            {products?.map((item) => {
              const selected = cartItems?.[item.code];
              const isOutOfStock = Number(item?.stock) <= 0;

              return (
                <div
                  key={item.code}
                  className={`product-info card
                    ${selected ? "selected active" : ""}
                    ${isOutOfStock ? "out-of-stock disabled-product" : ""}
                  `}
                  tabIndex={isOutOfStock ? -1 : 0}
                  onClick={() =>
                    !isOutOfStock && handleToggle(item, isOutOfStock)
                  }
                >
                  <div className="product-image-box">
                    <img
                      src={item.image || ""}
                      alt={item.name}
                      className={isOutOfStock ? "disabled-image" : ""}
                    />

                    {/* ✅ OUT OF STOCK BADGE */}
                    {isOutOfStock && (
                      <div className="out-of-stock-overlay">
                        <span className="out-of-stock-badge">Out of Stock</span>
                      </div>
                    )}

                    {/* ✅ SELECTED ICON */}
                    {selected && !isOutOfStock && (
                      <span className="product-selected-icon">
                        <i className="ti ti-circle-check-filled text-success" />
                      </span>
                    )}
                  </div>

                  <h6 className="cat-name">
                    <span>{item.categoryName}</span>
                  </h6>

                  <h6 className="product-name">
                    <span>{item.name}</span>
                  </h6>

                  <div className="d-flex align-items-center justify-content-between price">
                    <h6
                      className={`fs-14 fw-bold ${
                        isOutOfStock ? "text-muted" : "text-teal"
                      }`}
                    >
                      ₹{item.price}
                    </h6>

                    {selected && !isOutOfStock && (
                      <div
                        className="qty-item m-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CartCounter
                          item={item.code}
                          defaultValue={selected?.quantity}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
