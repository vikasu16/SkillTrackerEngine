import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const localData = localStorage.getItem("access_token");
  let auth = { token: false };

  if (localData !== null || localData !== undefined) {
    auth.token = true;
  }
  return auth.token ? <Outlet /> : <Navigate to="/" />;
}
