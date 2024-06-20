import styles from "./ManageProj.module.css";
import AttendanceList from "./AttendanceList/AttendanceList";

const ManageProj = () => {
  return (
    <div className={styles.manageProj}>
      <AttendanceList />
    </div>
  );
};

export default ManageProj;
