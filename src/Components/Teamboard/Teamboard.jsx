import styles from "./Teamboard.module.css";
import TeamLayout from "./Layout/TeamLayout";

const Teamboard = () => {
  return (
    <div className={styles.teamboard_wrapper}>
      <TeamLayout />
    </div>
  );
};

export default Teamboard;
