import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../../core/redux/cartSlice";
import CartCounter from "../../../core/common/counter/counter";
import VegIcon from "../../../components/common/vegIcon";
import NonVegIcon from "../../../components/common/nonVegIcon";

const ProductGrid = ({ products = [], activeTab }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleToggle = (product, isOutOfStock) => {
    if (isOutOfStock) return; // ❌ block click

    if (cartItems[product.code]) {
      dispatch(removeProduct(product.code));
    } else {
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
            {products.map((item) => {
              const selected = cartItems[item.code];
              const isOutOfStock = Number(item.stock) <= 0;

              return (
                <div
                  key={item.code}
                  className={`product-info card
                    ${selected ? "selected active" : ""}
                    ${isOutOfStock ? "out-of-stock" : ""}
                  `}
                  tabIndex={isOutOfStock ? -1 : 0}
                  onClick={() => handleToggle(item, isOutOfStock)}
                >
                  <div className="product-image-box">
                    <img src={item.imageUrl} alt={item.name} />

                    <span className="food-type-svg">
                      {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                    </span>

                    {isOutOfStock && (
                      <span className="out-of-stock-badge">
                        Out of Stock
                      </span>
                    )}

                    {selected && !isOutOfStock && (
                      <span className="product-selected-icon">
                        <i className="ti ti-circle-check-filled text-success" />
                      </span>
                    )}
                  </div>

                  <h6 className="cat-name">
                    <Link to="#">{item.categoryName}</Link>
                  </h6>

                  <h6 className="product-name">
                    <Link to="#">{item.name}</Link>
                  </h6>

                  <div className="d-flex align-items-center justify-content-between price">
                    <h6 className="text-teal fs-14 fw-bold">
                      ₹{item.price}
                    </h6>

                    {selected && !isOutOfStock && (
                      <div
                        className="qty-item m-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CartCounter
                          item={item.code}
                          defaultValue={selected.quantity}
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
