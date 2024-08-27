import styles from "./ManageProj.module.css";
import AttendanceList from "./attendanceList/AttendanceList";
import AttendanceDetail from "./attendanceDetail/AttendanceDetail";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import { useContext, useEffect } from "react";
import { TeamStateContext } from "../Teamboard";
import { isLeader } from "../isLeader";

const ManageProj = () => {
  const { teamData, teamId, loading } = useContext(TeamStateContext);
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const nav = useNavigate();

  useEffect(() => {
    // if (!loading) {
    //   if (isLeader(teamData.teamMemberInfo, loginUserId) === false) {
    //     alert("팀장만 접근 가능한 페이지입니다.");
    //     nav(`/teamboard/?team=${teamId}`, { replace: true });
    //   }
    // }
  });

  const navigateToEdit = () => {
    nav(`/teamboard/manage/edit/?team=${teamId}`);
  };
  return (
    <div className={styles.manageProj}>
      <div className={styles.manageProj__label}>회의 참석 인증</div>
      <div className={styles.manageProj__container}>
        <AttendanceList />
        <AttendanceDetail />
      </div>
      <div className={styles.manageProj__button}>
        <Button
          text="프로젝트 정보 수정"
          type="NONE__TEXT-TC2"
          onClick={navigateToEdit}
        />
      </div>
    </div>
  );
};

export default ManageProj;
