import styles from "./MemberItem.module.css";

const MemberItem = ({ memberName }) => {
  return (
    <div className={styles.memberItem}>
      <div className={styles.memberItem__container}>
        <button className={styles.memberItem__button}>
          <div className={styles.memberItem__profilePic}>사진</div>
          <div className={styles.memberItem__name}>{memberName}</div>
        </button>
      </div>
    </div>
  );
};

export default MemberItem;
