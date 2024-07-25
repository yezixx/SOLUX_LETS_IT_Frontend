// 로그인하지 않았을 시 접근 불가능한 화면
import React from "react";
import { useAtomValue } from "jotai";
import { isLoginAtom } from "../atoms/atoms";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isLogin = useAtomValue(isLoginAtom);

  return isLogin ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
