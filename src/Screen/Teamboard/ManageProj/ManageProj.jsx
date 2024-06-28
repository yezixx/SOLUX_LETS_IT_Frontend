import styles from "./ManageProj.module.css";
import AttendanceList from "./AttendanceList/AttendanceList";
import AttendanceDetail from "./AttendanceDetail/AttendanceDetail";
import { useNavigate } from "react-router-dom";

const ManageProj = () => {
  const nav = useNavigate();

  const navigateToEdit = () => {
    nav("/manage/edit");
  };
  return (
    <div className={styles.manageProj}>
      <div className={styles.manageProj__label}>회의 참석 인증</div>
      <div className={styles.manageProj__container}>
        <AttendanceList />
        <AttendanceDetail />
      </div>
      <div className={styles.manageProj__button}>
        <button onClick={navigateToEdit}>프로젝트 정보 수정</button>
      </div>
    </div>
  );
};

export default ManageProj;
