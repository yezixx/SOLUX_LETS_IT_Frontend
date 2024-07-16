import styles from "./VoteItem.module.css";

const VoteItem = ({ userName, userId }) => {
  return (
    <div className={styles.voteItem}>
      <div className={styles.voteItem__container}>
        <div className={styles.voteItem__profilePic}>사진</div>
        <div className={styles.voteItem__name}>{userName}</div>
        <div className={styles.voteItem__button}>
          <button className={styles["voteItem__button--o"]}>O</button>
          <button className={styles["voteItem__button--x"]}>X</button>
        </div>
      </div>
    </div>
  );
};

export default VoteItem;
