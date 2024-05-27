import styles from "./Teamboard.module.css";
import TeamFrame from "./Frame/TeamFrame";

const Teamboard = () => {
  return (
    <div className={styles.TeamboardWrap}>
      <TeamFrame />
    </div>
  );
};

export default Teamboard;
