import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import Header from "./Components/Header/Header";

function MainLayout() {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
