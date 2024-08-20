import { useRef, useState } from "react";
import ArrowTurnDownRight from "../../../image/icons/ArrowTurnDownRight";
import EllipsisHorizontalIcon from "../../../image/icons/EllipsisHorizontalIcon";
import HeartIcon from "../../../image/icons/HeartIcon";
import UserCircleIcon from "../../../image/icons/UserCircleIcon";
import styles from "./CommentItem.module.css";
import Button from "../../../components/button/Button";
import { getFormattedDate } from "../../../util/getFormattedDate";

const CommentItem = ({
  commentId,
  userId,
  nickname,
  comCreateDate,
  comUpdateDate,
  comContent,
  postWriter,
  inputRef,
  onDelete,
  onUpdate
}) => {
  const loginUserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;

  const [isOpen, setIsOpen] = useState(false);
  const [isOnChange, setIsOnChange] = useState(false);
  const [changeInput, setChangeInput] = useState(comContent);

  const changeInputRef = useRef();

  const isPostWriter = () => String(postWriter) === String(userId);
  const isCommentWriter = () => String(loginUserId) === String(userId);
  const onClickIcon = () => {
    setIsOpen(!isOpen);
  };

  const onClickReply = () => {
    inputRef.current.focus();
  };

  const onClickDelete = () => {
    onDelete(commentId);
  };

  const onChangeInput = (e) => {
    setChangeInput(e.target.value);
  };

  const onClickCompleteUpdate = () => {
    if (changeInput === comContent) {
      setIsOnChange(false);
      return;
    }
    if (changeInput === "") {
      changeInputRef.current.focus();
      return;
    }
    setIsOnChange(false);
    onUpdate(userId, commentId, changeInput);
  };

  const onClickCancelUpdate = () => {
    setIsOnChange(false);
  };

  return (
    <div className={styles.CommentItem}>
      {isOpen && (
        <div
          className={`${styles.CommentItem__menu} ${
            isPostWriter() ? styles.CommentItem__menu__WRITER : ""
          }`}
        >
          <Button
            text="수정"
            type="NONE__TEXT-TC2"
            onClick={() => {
              setIsOnChange(true);
              setIsOpen(false);
            }}
          />
          <Button text="삭제" type="NONE__TEXT-TC2" onClick={onClickDelete} />
        </div>
      )}
      <UserCircleIcon
        color={isPostWriter() ? "var(--main-color2)" : "var(--text-color2)"}
      />
      <div
        className={`${styles.CommentItem__container} ${
          isPostWriter() ? styles.CommentItem__container__WRITER : ""
        }`}
      >
        <div className={styles.CommentItem__header}>
          <div className={isPostWriter() ? styles.CommentItem__writer : ""}>
            {nickname} {isPostWriter() ? <span>(글쓴이)</span> : null}
          </div>
          <div>{getFormattedDate(comCreateDate)}</div>
          {comCreateDate !== comUpdateDate && <div>(수정됨)</div>}
          {isCommentWriter() && !isOnChange && (
            <div className={styles.CommentItem__icon} onClick={onClickIcon}>
              <EllipsisHorizontalIcon />
            </div>
          )}
        </div>
        <div className={styles.CommentItem__description}>
          {isOnChange ? (
            <textarea
              ref={changeInputRef}
              value={changeInput}
              onChange={onChangeInput}
              style={
                isPostWriter
                  ? {
                      backgroundColor: "var(--syb-color1)",
                      borderColor: "var(--text-color2)"
                    }
                  : {}
              }
            />
          ) : (
            comContent
          )}
        </div>
        <div className={styles.CommentItem__icon}>
          {isOnChange ? (
            <>
              <Button
                text="수정"
                type="NONE__TEXT-MC2-16"
                onClick={onClickCompleteUpdate}
              />
              <Button
                text="취소"
                type="NONE__TEXT-TC2"
                onClick={onClickCancelUpdate}
              />
            </>
          ) : (
            <>
              <HeartIcon />
              <ArrowTurnDownRight onClick={onClickReply} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
