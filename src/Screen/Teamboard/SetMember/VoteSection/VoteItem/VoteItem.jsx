import { useContext } from "react";
import styles from "./VoteItem.module.css";
import { TeamDispatchContext } from "../../../Teamboard";

const VoteItem = ({ userName, userId }) => {
  const { onAgree, onDisagree } = useContext(TeamDispatchContext);

  const onClickAgree = () => {
    onAgree(userId);
  };
  const onClickDisagree = () => {
    onDisagree(userId);
  };

  return (
    <div className={styles.voteItem}>
      <div className={styles.voteItem__container}>
        <div className={styles.voteItem__profilePic}>사진</div>
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
