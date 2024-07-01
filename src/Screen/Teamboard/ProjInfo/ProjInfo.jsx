import styles from "./ProjInfo.module.css";
import CollabTool from "./CollabTool/CollabTool";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";

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
            <Button text={"포트폴리오"} type={"SC_120x40"} />
            <Button
              text={"회의 인증"}
              type={"MC2_120x40"}
              onClick={navigateToManage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjInfo;
