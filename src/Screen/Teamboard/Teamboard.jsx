import styles from "./Teamboard.module.css";
import TeamLayout from "./Layout/TeamLayout";

const Teamboard = () => {
  return (
    <div className={styles.teamboard}>
      <div className={styles.teamboard__label}>팀 게시판</div>
      <TeamLayout />
    </div>
  );
};

export default Teamboard;
