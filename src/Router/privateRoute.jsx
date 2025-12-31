import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = sessionStorage.getItem("token");

    // अगर token नहीं है → redirect to login
    if (!token) {
        return <Navigate to="/signin" replace />
    }

    // अगर login है → allowed routes render करो
    return <Outlet />
}

export default PrivateRoute;
