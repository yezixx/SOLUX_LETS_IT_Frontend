import styles from "./TeamNav.module.css";
import { Link, useLocation } from "react-router-dom";

const TeamNav = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log(currentUrl);

  return (
    <div className={styles.nav__wrapper}>
      <div className={styles.nav__container}>
        <div className={styles.nav_label}>학원 청구 정산 서비스</div>
        <div className={styles.nav_buttons__container}>
          <Link to={"/"}>
            <button
              className={`${styles.nav_button} ${
                currentUrl === "/" ? styles.nav_button__current : ""
              }`}
            >
              프로젝트 정보
            </button>
          </Link>
          <Link to={"/SetMember"}>
            <button
              className={`${styles.nav_button} ${
                currentUrl === "/SetMember" ? styles.nav_button__current : ""
              }`}
            >
              팀원 설정
            </button>
          </Link>
          <Link to={"/ManageProj"}>
            <button
              className={`${styles.nav_button} ${
                currentUrl === "/ManageProj" ? styles.nav_button__current : ""
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
