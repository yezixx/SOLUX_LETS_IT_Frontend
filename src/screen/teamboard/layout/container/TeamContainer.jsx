import styles from "./TeamContainer.module.css";
import { Outlet } from "react-router-dom";

const TeamContainer = () => {
  return (
    <div className={styles.teamContainer}>
      <Outlet />
    </div>
  );
};

export default TeamContainer;
