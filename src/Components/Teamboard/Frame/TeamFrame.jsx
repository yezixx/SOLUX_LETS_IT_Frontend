import styles from "./TeamFrame.module.css";
import TopLabel from "./TopLabel/TopLabel";
import TeamNav from "./Nav/TeamNav";
import TeamContainer from "./Container/TeamContainer";

const TeamFrame = () => {
  return (
    <div className={styles.TeamFrameWrap}>
      <TopLabel />
      <TeamNav />
      <TeamContainer />
    </div>
  );
};

export default TeamFrame;
