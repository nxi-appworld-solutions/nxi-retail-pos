import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../core/redux/cartSlice";
import CartCounter from "../../core/common/counter/counter";
import VegIcon from "../common/vegIcon";
import NonVegIcon from "../common/nonVegIcon";

const ProductGrid = ({ categories = [], activeTab, searchTerm = "" }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);

  // Flatten all items from all categories
  const allProducts = categories?.flatMap(
    (cat) =>
      cat.items?.map((item) => ({
        ...item,
        categoryCode: cat.code,
        categoryName: cat.name,
      })) || []
  );

  // ✅ Toggle add/remove on click
  const handleToggle = (product) => {
    if (cartItems[product.code]) {
      dispatch(removeProduct(product.code));
    } else {
      dispatch(addProduct(product));
    }
  };

  // Filter by active category
  const filteredProducts =
    activeTab === "all"
      ? allProducts
      : allProducts.filter((p) => p.categoryCode === activeTab);

  useEffect(() => {
    document.body.classList.add("pos-page");
    return () => {
      document.body.classList.remove("pos-page");
    };
  }, [location.pathname]);

  return (
    // <div className="pos-products">
    //   <div className="tabs_container">
    //     <div className={`tab_content active`} data-tab={activeTab}>
    //       <div className="row row-cols-xxl-5 g-0">
    //         {filteredProducts?.map((item) => {
    //           const selected = cartItems[item.code];
    //           return (
    //             <div
    //               className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3"
    //               key={item.code}
    //             >

    //               <div
    //                 className={`product-info card mb-0 ${
    //                   selected ? "selected active" : ""
    //                 }`}
    //                 tabIndex="0"
    //                 onClick={() => handleToggle(item)}
    //               >
    //                 <div className="product-image-box">
    //                   <img src={item.imageUrl} alt={item.name} />
    //                   {selected && (
    //                     <span className="product-selected-icon">
    //                       <i className="ti ti-circle-check-filled text-success" />
    //                     </span>
    //                   )}
    //                 </div>

    //                 {/* <a className="pro-img">
    //                   <ImageWithBasePath src={item.imageUrl} alt={item.name} />
    //                   {selected && (
    //                     <span>
    //                       <i className="ti ti-circle-check-filled text-success" />
    //                     </span>
    //                   )}
    //                 </a> */}

    //                 <h6 className="cat-name">
    //                   <Link to="#">{item.categoryName}</Link>
    //                 </h6>
    //                 <h6 className="product-name">
    //                   <Link to="#">{item.name}</Link>
    //                 </h6>
    //                 <div className="d-flex align-items-center justify-content-between price">
    //                   <h6 className="text-teal fs-14 fw-bold">₹{item.price}</h6>
    //                   {selected && (
    //                     <div
    //                       className="qty-item m-0"
    //                       onClick={(e) => e.stopPropagation()}
    //                     >
    //                       <CartCounter
    //                         item={item?.code}
    //                         defaultValue={selected?.quantity}
    //                       />
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="pos-products">
      <div className="tabs_container">
        <div className={`tab_content active`} data-tab={activeTab}>
          {/* 🚀 Use CSS Grid instead of Bootstrap row */}
          <div className="product-grid">
            {filteredProducts?.map((item) => {
              const selected = cartItems[item.code];
              return (
                <div
                  className={`product-info card ${
                    selected ? "selected active" : ""
                  }`}
                  key={item.code}
                  tabIndex="0"
                  onClick={() => handleToggle(item)}
                >
                  {/* <div className="product-image-box">
                    <img src={item.imageUrl} alt={item.name} />
                    {selected && (
                      <span className="product-selected-icon">
                        <i className="ti ti-circle-check-filled text-success" />
                      </span>
                    )}
                  </div> */}

                  <div className="product-image-box">
                    <img src={item.imageUrl} alt={item.name} />

                    {/* Veg / Non-Veg Icon */}
                    {/* <span
                      className={`food-type-icon ${
                        item.isVeg ? "veg" : "non-veg"
                      }`}
                      title={item.isVeg ? "Vegetarian" : "Non Vegetarian"}
                    /> */}

                    <span className="food-type-svg">
                      {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                    </span>

                    {selected && (
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
                    <h6 className="text-teal fs-14 fw-bold">₹{item.price}</h6>
                    {selected && (
                      <div
                        className="qty-item m-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CartCounter
                          item={item?.code}
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
