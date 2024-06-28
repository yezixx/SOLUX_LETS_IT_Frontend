import styles from "./Teamboard.module.css";
import { Outlet } from "react-router-dom";

const Teamboard = () => {
  return (
    <div className={styles.teamboard}>
      <Outlet />
    </div>
  );
};

export default Teamboard;
