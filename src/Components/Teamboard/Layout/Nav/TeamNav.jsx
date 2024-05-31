import styles from "./TeamNav.module.css";
import { Link, useLocation } from "react-router-dom";

const TeamNav = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log(currentUrl);

  return (
    <div className={styles.nav_wrapper}>
      <div className={styles.nav_container}>
        <div className={styles.nav_label}>학원 청구 정산 서비스</div>
        <Link to={"/"}>
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
