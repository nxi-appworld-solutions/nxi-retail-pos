import React, { useEffect, useMemo, useState } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import usePos from "../../hooks/usePos";
import { getFormattedDate, getGreeting } from "../../utils/common";

import OrderDetails from "./OrderDetails";
import PaymentLoader from "../../components/loader/pos/paymentLoader";
import ProductGrid from "../../components/pos/ProductGrid";
import CategorySidebar from "../../components/pos/CategorySidebar";
import PosHeader from "../../components/pos/PosHeader";
import PosFooter from "../../components/pos/PosFooter";

const PosLayout = () => {
  const { loading, categories, products } = usePos();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("Processing...");

  const today = getFormattedDate();
  const greeting = getGreeting();

  // const mergedCategories = categories.map((cat) => ({
  //   ...cat,
  //   items: products.filter((p) => p.parentGrp === cat.code),
  // }));

  const productByCategory = useMemo(() => {
    const map = {};
    for (const p of products) {
      if (!map[p.parentGrp]) map[p.parentGrp] = [];
      map[p.parentGrp].push(p);
    }
    return map;
  }, [products]);

  const mergedCategories = useMemo(() => {
    return categories.map((c) => ({
      ...c,
      items: productByCategory[c.code] || [],
    }));
  }, [categories, productByCategory]);

  // Hotkeys
  useHotkeys("f1", () =>
    document.querySelector("input[placeholder='Search Product']").focus()
  );

  return (
    <>
      <PaymentLoader
        isLoading={globalLoading || loading}
        message={loaderMessage}
      />

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
                          categories={categories || []}
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                      </div>

                      <div className="modern-pos-products">
                        <ProductGrid
                          categories={mergedCategories || []}
                          activeTab={activeTab}
                          searchTerm={searchTerm}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 🧾 Order Details Section */}
              <div className="col-md-12 col-lg-5 col-xl-4 ps-0 theiaStickySidebar">
                <OrderDetails
                  categories={mergedCategories}
                  onLoadingChange={(state) => setGlobalLoading(state)}
                  onLoaderMessageChange={setLoaderMessage}
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
