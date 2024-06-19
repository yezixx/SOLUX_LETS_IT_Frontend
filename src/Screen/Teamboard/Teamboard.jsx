import styles from "./Teamboard.module.css";
import TeamLayout from "./Layout/TeamLayout";

const Teamboard = () => {
  return (
    <div className={styles.teamboard}>
      <TeamLayout />
    </div>
  );
};

export default Teamboard;
