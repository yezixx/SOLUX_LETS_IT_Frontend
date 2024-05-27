import styles from "./ProjInfo.module.css";
import CollabTool from "./CollabTool/CollabTool";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";

const ProjInfo = () => {
  return (
    <div className={styles.ProjInfoWrap}>
      <div className={styles.LeftCont}>
        <TeamCalendar />
      </div>
      <div className={styles.RightCont}>
        <MemberList />
        <CollabTool />
        <button>포트폴리오</button>
        <button>회의 인증</button>
      </div>
    </div>
  );
};

export default ProjInfo;
