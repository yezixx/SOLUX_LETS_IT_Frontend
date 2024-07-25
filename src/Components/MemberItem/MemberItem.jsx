import styles from "./MemberItem.module.css";
import defaultProfilePic from "../../assets/user.svg";
import { useState } from "react";

const MemberItem = ({ memberName, profilePic, type, onClick }) => {
  const [imgSrc, setImgSrc] = useState(profilePic || defaultProfilePic);

  const handleImgError = () => {
    setImgSrc(defaultProfilePic);
  };

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
            src={imgSrc}
            onError={handleImgError}
          />
          <div className={styles.memberItem__name}>{memberName}</div>
        </button>
      </div>
    </div>
  );
};

export default MemberItem;
