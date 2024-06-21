import styles from "./TeamLayout.module.css";
import TeamNav from "./Nav/TeamNav";
import TeamContainer from "./Container/TeamContainer";

const TeamLayout = () => {
  return (
    <div className={styles.teamLayout}>
      <TeamNav />
      <TeamContainer />
    </div>
  );
};

export default TeamLayout;
