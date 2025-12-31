/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProductSearch from "./ProductSearch";
import ProductTable from "./ProductTable";
import { useDispatch } from "react-redux";
import { setTransactionType } from "../../../core/redux/transactionSlice";

export default function TransactionPage({ type }) {
  const [products, setProducts] = useState([]);

  const handleProductSelect = (product) => {
    setProducts((prev) => {
      const existing = prev.find((p) => p.code === product.code);

      if (existing) {
        return prev.map((p) =>
          p.code === product.code
            ? {
                ...p,
                qty: p.qty + 1,
                totalCost: (p.qty + 1) * p.unitCost,
              }
            : p
        );
      }

      return [
        ...prev,
        { ...product, qty: 1, totalCost: product.unitCost || 0 },
      ];
    });
  };

  const handleQtyChange = (qty, record) => {
    console.log("record", record);
    setProducts((prev) =>
      prev.map((p) =>
        p.code === record.code ? { ...p, qty, totalCost: qty * p.price } : p
      )
    );
  };

  const handleRemove = (record) => {
    setProducts((prev) => prev.filter((p) => p.code !== record.code));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTransactionType({ type }));
  }, [dispatch]);

  return (
    <div>
      {/* <h3>Transaction</h3> */}
      <ProductSearch onProductSelect={handleProductSelect} />
      <ProductTable
        products={products}
        setProducts={setProducts}
        onQtyChange={handleQtyChange}
        onRemove={handleRemove}
      />
    </div>
  );
}
