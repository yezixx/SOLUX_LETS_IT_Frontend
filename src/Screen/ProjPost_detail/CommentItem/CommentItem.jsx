import { useState } from "react";
import ArrowTurnDownRight from "../../../Image/Icons/ArrowTurnDownRight";
import EllipsisHorizontalIcon from "../../../Image/Icons/EllipsisHorizontalIcon";
import HeartIcon from "../../../Image/Icons/HeartIcon";
import UserCircleIcon from "../../../Image/Icons/UserCircleIcon";
import styles from "./CommentItem.module.css";
import Button from "../../../Components/Button/Button";

const CommentItem = ({ writer, date, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoginedUser = true;

  const onClickIcon = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.CommentItem}>
      {isOpen && (
        <div className={styles.CommentItem__menu}>
          <Button text="수정" type="NONE__TEXT-TC2" />
          <Button text="삭제" type="NONE__TEXT-TC2" />
        </div>
      )}
      <UserCircleIcon />
      <div className={styles.CommentItem__container}>
        <div className={styles.CommentItem__header}>
          <div>{writer}</div>
          <div>{date}</div>
          {isLoginedUser && (
            <div className={styles.CommentItem__icon} onClick={onClickIcon}>
              <EllipsisHorizontalIcon />
            </div>
          )}
        </div>
        <div className={styles.CommentItem__description}>{description}</div>
        <div className={styles.CommentItem__icon}>
          <HeartIcon />
          <ArrowTurnDownRight />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
