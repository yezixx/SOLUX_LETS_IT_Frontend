import styles from "./ManageProj.module.css";
import AttendanceList from "./AttendanceList/AttendanceList";
import AttendanceDetail from "./AttendanceDetail/AttendanceDetail";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import { useContext } from "react";
import { TeamStateContext } from "../Teamboard";

const ManageProj = () => {
  const { teamId } = useContext(TeamStateContext);

  const nav = useNavigate();

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
