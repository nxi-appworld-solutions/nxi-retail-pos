import React, { useEffect, useState } from "react";

import { getFormattedDate, getGreeting } from "../../../utils/common";
import { useHotkeys } from "react-hotkeys-hook";
import PosFooter from "./sections/PosFooter";
import PosHeader from "./sections/PosHeader";
import usePos from "../../../hooks/usePos";
import CategorySidebar from "./sections/CategorySidebar";
import ProductGrid from "./sections/ProductGrid";
import OrderDetails from "./sections/OrderDetails";
import { useDispatch } from "react-redux";
import { validateCartProducts } from "../../../core/redux/cartSlice";
import PosLoader from "../../common/PosLoader";

const PosLayout1 = () => {
  const dispatch = useDispatch();
  const { summary, loading } = usePos();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const today = getFormattedDate();
  const greeting = getGreeting();

  // Hotkeys
  useHotkeys("f1", () =>
    document.querySelector("input[placeholder='Search Product']").focus()
  );

  return (
    <>
      {
        <PosLoader
          loading={loading}
          type="spinner"
          message="Loading POS Data..."
        />
      }
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
                          categories={summary || []}
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                      </div>

                      <div className="modern-pos-products">
                        <ProductGrid
                          categories={summary || []}
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
                <OrderDetails categories={summary || []} />
              </div>
            </div>
            <PosFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default PosLayout1;
