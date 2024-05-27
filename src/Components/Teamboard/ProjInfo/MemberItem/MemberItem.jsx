import styles from "./MemberItem.module.css";

const MemberItem = () => {
  return (
    <div className={styles.MemberItemWrap}>
      <div className={styles.MemberItemCont}>
        <button>팀원 이름</button>
      </div>
    </div>
  );
};

export default MemberItem;
