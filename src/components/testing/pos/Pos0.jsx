import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategorySlider from "./sections/CategorySlider";
import ProductGrid from "./sections/ProductGrid";
import OrderDetails from "./sections/OrderDetails";
import usePos from "../../../hooks/usePos";
import PosFooter from "./sections/PosFooter";
import { getFormattedDate, getGreeting } from "../../../utils/common";
import { useHotkeys } from "react-hotkeys-hook";
import PosHeader from "./sections/PosHeader";

const Pos__ = () => {
  const { summary, fetchSummary, loading } = usePos();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const today = getFormattedDate();
  const greeting = getGreeting();

  // 🎹 Hotkeys
  useHotkeys("f1", () =>
    document.querySelector("input[placeholder='Search Product']").focus()
  );
  useHotkeys("f2", () => alert("Open Add Customer Modal"));
  useHotkeys("f3", () => alert("Open Payment Section"));

  return (
    <div className="main-wrapper pos-five">
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          <div className="row pos-wrapper">
            {/* 🛍️ Products Section */}
            <div className="col-md-12 col-lg-7 col-xl-8 d-flex">
              <div className="pos-categories tabs_wrapper p-0 flex-fill">
                <div className="content-wrap">
                  <CategorySlider
                    categories={summary || []}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />

                  {/* Header + Search + Filters */}
                  <div className="tab-content-wrap">
                    <PosHeader
                      greeting={greeting}
                      today={today}
                      userName={`Revergent`}
                      onSearch={(p) => setSearchTerm(p)}
                    />

                    {/* Product Grid */}
                    <ProductGrid
                      categories={summary || []}
                      activeTab={activeTab}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 🧾 Order Details Section */}
            <div className="col-md-12 col-lg-5 col-xl-4 ps-0 theiaStickySidebar">
              <OrderDetails categories={summary || []} />
            </div>
          </div>
          {/* Footer */}
          <PosFooter />
        </div>
      </div>
    </div>
  );
};

export default Pos__;
