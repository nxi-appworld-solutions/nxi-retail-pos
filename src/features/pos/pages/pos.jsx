import React, { useEffect, useMemo, useState } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import usePos from "../../../hooks/usePos";
import { getFormattedDate, getGreeting } from "../../../utils/common";

import PosOrder from "./posOrder";
import PosFooter from "./posFooter";
import PaymentLoader from "../../../components/loader/pos/paymentLoader";
import ProductGrid from "../components/ProductGrid";
import CategorySidebar from "../components/CategorySidebar";
import PosHeader from "../components/PosHeader";
import PaymentProcessing from "../components/paymentProcessing";
import usePosCommon from "../../../hooks/usePosCommon";

const PosLayout = () => {
  const { loading, allCategories, allProducts } = usePos();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("Processing...");
  const [showProcessing, setShowProcessing] = useState(false);

  const { categories, products } = usePosCommon({
    categories: allCategories,
    products: allProducts,
    activeTab,
    searchTerm,
  });
  const today = getFormattedDate();
  const greeting = getGreeting();

  // Hotkeys
  useHotkeys("f1", () =>
    document.querySelector("input[placeholder='Search Product']").focus()
  );

  useEffect(() => {
    console.log("Search:", searchTerm);
    console.log("Visible products:", products.length);
  }, [searchTerm, products]);

  return (
    <>
      {/* Global loader */}
      <PaymentLoader
        isLoading={globalLoading || loading}
        message={loaderMessage}
      />

      {/* Payment processing overlay */}
      <PaymentProcessing isLoading={showProcessing} />
      <div className="main-wrapper pos-five">
        <div className="page-wrapper pos-pg-wrapper ms-0">
          <div className="content pos-design p-0">
            <div className="row pos-wrapper">
              <div className="col-md-12 col-lg-7 col-xl-8 d-flex">
                <div className=" tabs_wrapper p-0 flex-fill">
                  <div className="modern-pos-wrapper">
                    {/* Header */}
                    <PosHeader
                      greeting={greeting}
                      today={today}
                      userName="Revergent"
                      onSearch={(v) => setSearchTerm(v)}
                    />

                    {/* Body */}
                    <div className="modern-pos-body">
                      <div className="modern-pos-categories">
                        <CategorySidebar
                          categories={allCategories}
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                      </div>

                      <div className="modern-pos-products">
                        <ProductGrid
                          activeTab={activeTab}
                          products={products}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 🧾 Order Details Section */}
              <div className="col-md-12 col-lg-5 col-xl-4 ps-0 theiaStickySidebar">
                <PosOrder
                  categories={categories}
                  onLoadingChange={(state) => setGlobalLoading(state)}
                  onLoaderMessageChange={setLoaderMessage}
                  onShowProcessing={(v) => setShowProcessing(v)}
                />
              </div>
            </div>
            <PosFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default PosLayout;
