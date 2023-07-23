import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function MainRoutes() {
  const localData = localStorage.getItem("access_token");
  let routhtologin = { token: false };

  if (localData === null || localData === undefined) {
    routhtologin.token = true;
  }
  return routhtologin.token ? <Outlet /> : <Navigate to="/dashboard" />;
}
