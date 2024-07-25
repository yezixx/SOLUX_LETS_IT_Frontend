import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import { RouterInfo } from "./Screen/RouterInfo";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { isLoginAtom } from "./atoms/atoms";

const RouterObject = createBrowserRouter(RouterInfo);

function App() {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  // 로컬 스토리지에서 로그인 상태를 복원
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLogin(true); // 전역 상태 업데이트
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);
  return (
    <div className={styles.wrap}>
      <RouterProvider router={RouterObject} />
    </div>
  );
}

export default App;
