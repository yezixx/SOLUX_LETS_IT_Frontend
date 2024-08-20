import { useContext, useState } from "react";
import styles from "./VoteItem.module.css";
import { TeamDispatchContext } from "../../../Teamboard";
import defaultProfilePic from "../../../../../assets/user.svg";

const VoteItem = ({ userName, userId, profilePic }) => {
  const { onAgree, onDisagree } = useContext(TeamDispatchContext);
  const [imgSrc, setImgSrc] = useState(profilePic || defaultProfilePic);

  const handleImgError = () => {
    setImgSrc(defaultProfilePic);
  };

  const onClickAgree = () => {
    onAgree(userId);
  };
  const onClickDisagree = () => {
    onDisagree(userId);
  };

  return (
    <div className={styles.voteItem}>
      <div className={styles.voteItem__container}>
        <img
          className={styles.voteItem__profilePic}
          src={imgSrc}
          onError={handleImgError}
        />
        <div className={styles.voteItem__name}>{userName}</div>
        <div className={styles.voteItem__button}>
          <button
            className={styles["voteItem__button--o"]}
            onClick={onClickAgree}
          >
            O
          </button>
          <button
            className={styles["voteItem__button--x"]}
            onClick={onClickDisagree}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteItem;
