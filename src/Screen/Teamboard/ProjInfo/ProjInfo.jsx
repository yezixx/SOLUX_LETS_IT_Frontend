import styles from "./ProjInfo.module.css";
import CollabTool from "./CollabTool/CollabTool";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";

const ProjInfo = () => {
  return (
    <div className={styles.projInfo}>
      <div className={styles.calendar}>
        <TeamCalendar />
      </div>
      <div className={styles.rightContent}>
        <div className={styles.rightContent__memberList}>
          <MemberList />
        </div>
        <div className={styles.rightContent__buttonContainer}>
          <div className={styles.rightContent__leftButton}>
            <CollabTool />
            <CollabTool />
          </div>
          <div className={styles.rightContent__rightButton}>
            <button className={styles.portfolioButton}>포트폴리오</button>
            <button className={styles.authmeetingButton}>회의 인증</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjInfo;
