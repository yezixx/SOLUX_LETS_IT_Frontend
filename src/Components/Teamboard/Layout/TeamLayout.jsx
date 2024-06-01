import styles from "./TeamLayout.module.css";
import TopLabel from "./TopLabel/TopLabel";
import TeamNav from "./Nav/TeamNav";
import TeamContainer from "./Container/TeamContainer";

const TeamLayout = () => {
  return (
    <div className={styles.team_layout__wrapper}>
      <TopLabel />
      <TeamNav />
      <TeamContainer />
    </div>
  );
};

export default TeamLayout;
