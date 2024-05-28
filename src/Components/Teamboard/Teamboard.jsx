import styles from "./Teamboard.module.css";
import TeamLayout from "./Layout/TeamLayout";

const Teamboard = () => {
  return (
    <div className={styles.TeamboardWrap}>
      <TeamLayout />
    </div>
  );
};

export default Teamboard;
