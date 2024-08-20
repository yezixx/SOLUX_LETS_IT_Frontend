import styles from "./MemberItem.module.css";
import defaultProfilePic from "../../assets/user.svg";
import { useState } from "react";
import crown from "../../assets/crown.svg";

const MemberItem = ({ memberName, profilePic, type, onClick, isLeader }) => {
  const [imgSrc, setImgSrc] = useState(
    profilePic ? profilePic : defaultProfilePic
  );
  console.log(profilePic);
  const handleImgError = () => {
    setImgSrc(defaultProfilePic);
  };

  return (
    <div className={styles.memberItem}>
      {isLeader && <img src={crown} />}
      <div className={styles.memberItem__container}>
        <button
          className={`${styles.memberItem__button} ${
            styles[`memberItem__button--${type}`]
          } `}
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
