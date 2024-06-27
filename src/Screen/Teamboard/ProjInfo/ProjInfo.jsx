import styles from "./ProjInfo.module.css";
import CollabTool from "./CollabTool/CollabTool";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";
import { Link } from "react-router-dom";

const ProjInfo = () => {
  const TOOLLIST = [
    { id: 0, tool: "노션" },
    { id: 1, tool: "깃허브" },
  ];

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
            <Link to={"/ManageProj"}>
              <button className={styles.authmeetingButton}>회의 인증</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjInfo;
