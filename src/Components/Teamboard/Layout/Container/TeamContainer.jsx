import styles from "./TeamContainer.module.css";
import { Outlet } from "react-router-dom";

const TeamContent = () => {
  return (
    <div className={styles.team_container__wrapper}>
      <Outlet />
    </div>
  );
};

export default TeamContent;
