import styles from "./ProjInfo.module.css";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import ToolIcon from "../../../Components/ToolIcon/ToolIcon";

const ProjInfo = () => {
  const TOOLLIST = [
    { id: 0, tool: "노션" },
    { id: 1, tool: "깃허브" },
  ];

  const nav = useNavigate();

  const navigateToManage = () => {
    nav("/teamboard/manage");
  };

  return (
    <div className={styles.projInfo__wrapper}>
      <div className={styles.projInfo__container}>
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
                <ToolIcon key={tool.id} alt={tool.tool} type="60x60" />
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
    </div>
  );
};

export default ProjInfo;
