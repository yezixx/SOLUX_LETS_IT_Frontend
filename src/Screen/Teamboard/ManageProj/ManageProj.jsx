import styles from "./ManageProj.module.css";
import AttendanceList from "./AttendanceList/AttendanceList";
import AttendanceDetail from "./AttendanceDetail/AttendanceDetail";

const ManageProj = () => {
  return (
    <div className={styles.manageProj}>
      <div className={styles.manageProj__label}>회의 참석 인증</div>
      <div className={styles.manageProj__container}>
        <AttendanceList />
        <AttendanceDetail />
      </div>
    </div>
  );
};

export default ManageProj;
