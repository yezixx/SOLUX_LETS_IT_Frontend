// 로그인하지 않았을 시 접근 불가능한 화면
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuth = localStorage.getItem("token");

  return isAuth ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
