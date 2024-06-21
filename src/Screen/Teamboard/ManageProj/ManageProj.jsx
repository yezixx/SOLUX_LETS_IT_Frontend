import styles from "./ManageProj.module.css";
import AttendanceList from "./AttendanceList/AttendanceList";
import AttendanceDetail from "./AttendanceDetail/AttendanceDetail";
import { Link } from "react-router-dom";

const ManageProj = () => {
  return (
    <div className={styles.manageProj}>
      <div className={styles.manageProj__label}>회의 참석 인증</div>
      <div className={styles.manageProj__container}>
        <AttendanceList />
        <AttendanceDetail />
      </div>
      <div className={styles.manageProj__button}>
        <Link to={"/UpdateProj"}>
          <button>프로젝트 정보 수정</button>
        </Link>
      </div>
    </div>
  );
};

export default ManageProj;
