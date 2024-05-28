import styles from "./TeamContainer.module.css";
import { Outlet } from "react-router-dom";

const TeamContent = () => {
  return (
    <div className={styles.TeamContainerWrap}>
      <Outlet />
    </div>
  );
};

export default TeamContent;
