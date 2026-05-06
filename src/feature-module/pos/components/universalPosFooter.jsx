// components/pos/UniversalPosFooter.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectStoreType } from "../../../core/redux/store/storeTypeSlice";

import RestaurantFooter from "./footer/restaurantFooter";
import CafeFooter from "./footer/cafeFooter";
import GroceryFooter from "./footer/groceryFooter";
import RetailFooter from "./footer/retailFooter";

const UniversalPosFooter = () => {
  const storeType = useSelector(selectStoreType);

  switch (storeType) {
    case "restaurant":
      return <RestaurantFooter />;
    case "cafe":
      return <CafeFooter />;
    case "grocery":
      return <GroceryFooter />;
    default:
      return <RetailFooter />;
  }
};

export default UniversalPosFooter;
