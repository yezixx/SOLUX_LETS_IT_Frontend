import styles from "./KickMember.module.css";

const KickMember = ({ memberName }) => {
  return (
    <div className={styles.kickMember}>
      <div className={styles.kickMember_container}>
        <button className={styles.kickMember__button}>
          <div className={styles.kickMember__profilePic}>사진</div>
          <div className={styles.kickMember__name}>{memberName}</div>
        </button>
      </div>
    </div>
  );
};

export default KickMember;
