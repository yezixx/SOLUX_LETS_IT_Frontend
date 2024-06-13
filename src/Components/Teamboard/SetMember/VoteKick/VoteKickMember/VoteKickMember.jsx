import styles from "./VoteKickMember.module.css";

const KickMember = ({ memberName }) => {
  return (
    <div className={styles.voteKickMember}>
      <div className={styles.voteKickMember_container}>
        <div className={styles.voteKickMember__profilePic}>사진</div>
        <div className={styles.voteKickMember__name}>{memberName}</div>
        <div className={styles.voteKickMember__button}>
          <button className={styles["voteKickMember__button--o"]}>O</button>
          <button className={styles["voteKickMember__button--x"]}>X</button>
        </div>
      </div>
    </div>
  );
};

export default KickMember;
