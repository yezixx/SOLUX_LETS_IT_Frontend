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
        <div className={styles.nav_buttons_container}>
          <Link to={"/"}>
            <button
              className={`${styles.nav_button} ${
                currentUrl === "/" ? styles.currentPage_btn : ""
              }`}
            >
              프로젝트 정보
            </button>
          </Link>
          <Link to={"/SetMember"}>
            <button
              className={`${styles.nav_button} ${
                currentUrl === "/SetMember" ? styles.currentPage_btn : ""
              }`}
            >
              팀원 설정
            </button>
          </Link>
          <Link to={"/ManageProj"}>
            <button
              className={`${styles.nav_button} ${
                currentUrl === "/ManageProj" ? styles.currentPage_btn : ""
              }`}
            >
              프로젝트 관리
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamNav;
