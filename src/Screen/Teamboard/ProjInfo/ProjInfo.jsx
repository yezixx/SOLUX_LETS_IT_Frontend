import styles from "./ProjInfo.module.css";
import MemberList from "./MemberList/MemberList";
import TeamCalendar from "./TeamCalendar/TeamCalendar";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import ToolIcon from "../../../Components/ToolIcon/ToolIcon";
import { useContext } from "react";
import { TeamStateContext } from "../Teamboard";
import { getLogoImage } from "../../../util/getLogoImage";

const ProjInfo = () => {
  const { teamData, teamId } = useContext(TeamStateContext);
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const notion = teamData.notionLink;
  const github = teamData.githubLink;

  const nav = useNavigate();

  const navigateToManage = () => {
    if (
      loginUserId !==
      teamData.teamMemberInfo.find(
        (member) => member.position === "Team_Leader"
      ).userId
    ) {
      alert("팀장만 접근가능합니다.");
      return;
    }
    nav(`/teamboard/manage/?team=${teamId}`);
  };

  const navigateToPortfolio = () => {
    nav("/mypage/portfolio");
  };

  const onClickToolIcon = (url) => {
    window.open(url);
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
              <ToolIcon
                alt={"notion"}
                src={getLogoImage("notion")}
                type="60x60"
                onClick={() => onClickToolIcon(notion)}
              />
              <ToolIcon
                alt={"github"}
                src={getLogoImage("github")}
                type="60x60"
                onClick={() => onClickToolIcon(github)}
              />
            </div>
            <div className={styles.rightContent__rightButtons}>
              <Button
                text={"포트폴리오"}
                type={"SC_120x40"}
                onClick={navigateToPortfolio}
              />
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
