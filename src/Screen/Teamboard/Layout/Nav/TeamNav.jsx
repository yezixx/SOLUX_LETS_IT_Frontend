import styles from "./TeamNav.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TeamStateContext } from "../../Teamboard";

const TeamNav = () => {
  const location = useLocation();
  const currentUrl = location.pathname + location.search;

  const { teamData, teamId } = useContext(TeamStateContext);

  const nav = useNavigate();

  const mainUrl = `/teamboard/?team=${teamId}`;
  const setMemberUrl = `/teamboard/member/?team=${teamId}`;
  const manageUrl = `/teamboard/manage/?team=${teamId}`;
  const editUrl = `/teamboard/manage/edit/?team=${teamId}`;

  const navigateToTeamboard = () => {
    nav(mainUrl);
  };
  const navigateToMember = () => {
    nav(setMemberUrl);
  };
  const navigateToManage = () => {
    nav(manageUrl);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.nav__label}>{teamData.teamName}</div>
        <div className={styles.nav__buttonContainer}>
          <button
            className={`${styles.nav__button} ${
              currentUrl === mainUrl ? styles["nav__button--selected"] : ""
            }`}
            onClick={navigateToTeamboard}
          >
            프로젝트 정보
          </button>
          <button
            className={`${styles.nav__button} ${
              currentUrl === setMemberUrl ? styles["nav__button--selected"] : ""
            }`}
            onClick={navigateToMember}
          >
            팀원 설정
          </button>
          <button
            className={`${styles.nav__button} ${
              currentUrl === manageUrl || currentUrl === editUrl
                ? styles["nav__button--selected"]
                : ""
            }`}
            onClick={navigateToManage}
          >
            프로젝트 관리
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamNav;
