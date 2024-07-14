import styles from "./TeamLayout.module.css";
import TeamNav from "./Nav/TeamNav";
import TeamContainer from "./Container/TeamContainer";

const TeamLayout = () => {
  return (
    <div className={styles.teamLayout}>
      <div className={styles.teamLayout__label}>팀 게시판</div>
      <div className={styles.teamLayout__container}>
        <TeamNav />
        <TeamContainer />
      </div>
    </div>
  );
};

export default TeamLayout;
