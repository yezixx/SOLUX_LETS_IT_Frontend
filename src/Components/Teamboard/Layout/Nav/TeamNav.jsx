import styles from "./TeamNav.module.css";
import { Link, useLocation } from "react-router-dom";

const TeamNav = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log(currentUrl);

  return (
    <div className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.nav__label}>학원 청구 정산 서비스</div>
        <div className={styles.nav__buttonContainer}>
          <Link to={"/"}>
            <button
              className={`${styles.nav__button} ${
                currentUrl === "/" ? styles["nav__button--selected"] : ""
              }`}
            >
              프로젝트 정보
            </button>
          </Link>
          <Link to={"/SetMember"}>
            <button
              className={`${styles.nav__button} ${
                currentUrl === "/SetMember"
                  ? styles["nav__button--selected"]
                  : ""
              }`}
            >
              팀원 설정
            </button>
          </Link>
          <Link to={"/ManageProj"}>
            <button
              className={`${styles.nav__button} ${
                currentUrl === "/ManageProj"
                  ? styles["nav__button--selected"]
                  : ""
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
