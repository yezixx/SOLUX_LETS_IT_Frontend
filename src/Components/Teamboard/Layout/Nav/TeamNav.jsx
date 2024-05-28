import styles from "./TeamNav.module.css";
import { Link } from "react-router-dom";

const TeamNav = () => {
  return (
    <div className={styles.NavWrap}>
      <div className={styles.NavCont}>
        <div className={styles.NavContLeft}>학원 청구 정산 서비스</div>
        <Link to={"/ProjInfo"}>
          <button>프로젝트 정보</button>
        </Link>
        <Link to={"/SetMember"}>
          <button>팀원 설정</button>
        </Link>
        <Link to={"/ManageProj"}>
          <button>프로젝트 관리</button>
        </Link>
      </div>
    </div>
  );
};

export default TeamNav;
