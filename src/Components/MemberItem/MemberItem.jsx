import styles from "./MemberItem.module.css";
import defaultProfilePic from "../../assets/user.svg";

const MemberItem = ({ memberName, profilePic, type, onClick }) => {
  return (
    <div className={styles.memberItem}>
      <div className={styles.memberItem__container}>
        <button
          className={`${styles.memberItem__button} ${
            styles[`memberItem__button--${type}`]
          }`}
          onClick={onClick}
          disabled={type === "COMPLETED"}
        >
          <img
            className={styles.memberItem__profilePic}
            src={profilePic ? profilePic : defaultProfilePic}
          />
          <div className={styles.memberItem__name}>{memberName}</div>
        </button>
      </div>
    </div>
  );
};

export default MemberItem;
