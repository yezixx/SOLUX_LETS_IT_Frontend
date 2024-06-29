import styles from "./ProjInfo.module.css";
import CollabTool from "./CollabTool/CollabTool";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";
import { useNavigate } from "react-router-dom";

const ProjInfo = () => {
  const TOOLLIST = [
    { id: 0, tool: "노션" },
    { id: 1, tool: "깃허브" },
  ];

  const nav = useNavigate();

  const navigateToManage = () => {
    nav("/manage");
  };

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
          <div className={styles.rightContent__toolButton}>
            {TOOLLIST.map((tool) => (
              <CollabTool key={tool.id} tool={tool.tool} />
            ))}
          </div>
          <div className={styles.rightContent__rightButtons}>
            <button className={styles.portfolioButton}>포트폴리오</button>
            <button
              className={styles.authmeetingButton}
              onClick={navigateToManage}
            >
              회의 인증
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjInfo;
