import styles from "./TeamNav.module.css";

const TeamNav = () => {
  return (
    <div className={styles.NavWrap}>
      <div className={styles.NavCont}>
        <div className={styles.NavContLeft}>학원 청구 정산 서비스</div>
        <button>프로젝트 정보</button>
        <button>팀원 설정</button>
        <button>프로젝트 관리</button>
      </div>
    </div>
  );
};

export default TeamNav;
