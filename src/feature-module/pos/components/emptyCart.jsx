import React from "react";

const EmptyCart = () => {
  return (
    <aside className="product-order-list bg-secondary-transparent flex-fill">
      <div className="empty-cart-full d-flex flex-column align-items-center justify-content-center text-center">
        <div className="empty-cart-icon mb-3">
          <img
            // src="/assets/pos/empty-cart-illustration.svg"
            src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-illustration-download-in-svg-png-gif-file-formats--is-bucket-basket-no-data-states-pack-design-development-illustrations-3780056.png"
            alt="Empty Cart"
            style={{ width: "150px", opacity: 0.9 }}
          />
        </div>

        <h4 className="fw-bold text-gray-800 mb-2">Your cart is empty</h4>

        <p className="text-muted fs-14 mb-4" style={{ maxWidth: "280px" }}>
          Start adding products to create a new order.
        </p>

        <button
          className="btn btn-primary px-4 py-2"
          onClick={() => toast.info("Select a product to begin")}
        >
          Browse Products
        </button>
      </div>
    </aside>
  );
};

export default EmptyCart;
