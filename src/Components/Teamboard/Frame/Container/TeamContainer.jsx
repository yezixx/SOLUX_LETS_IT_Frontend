import styles from "./TeamContainer.module.css";
import ProjInfo from "../../ProjInfo/ProjInfo";

const TeamContent = () => {
  return (
    <div className={styles.TeamContainerWrap}>
      <ProjInfo />
    </div>
  );
};

export default TeamContent;
