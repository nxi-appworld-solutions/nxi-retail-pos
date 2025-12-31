import React from "react";
import { Route, Routes } from "react-router-dom";

import { kdsRoutes, pagesRoute, posRoutes, publicRoutes } from "./router.link";

import PosLayout from "./posLayout";
import AuthPages from "./authPages";
import HeaderLayouts from "./headerLayout";
import PrivateRoute from "./privateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KdsLayout from "./kdsLayout";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<HeaderLayouts />}>
            {publicRoutes.map((route, id) => (
              <Route path={route.path} element={route.element} key={id} />
            ))}
          </Route>

          <Route element={<PosLayout />}>
            {posRoutes.map((route, id) => (
              <Route path={route.path} element={route.element} key={id} />
            ))}
          </Route>

          <Route element={<KdsLayout />}>
            {kdsRoutes.map((route, id) => (
              <Route path={route.path} element={route.element} key={id} />
            ))}
          </Route>
        </Route>

        {/* Public routes (signin, signup, etc.) */}
        <Route element={<AuthPages />}>
          {pagesRoute.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};
export default AllRoutes;
