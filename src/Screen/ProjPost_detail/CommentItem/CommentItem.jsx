import { useRef, useState } from "react";
import ArrowTurnDownRight from "../../../Image/Icons/ArrowTurnDownRight";
import EllipsisHorizontalIcon from "../../../Image/Icons/EllipsisHorizontalIcon";
import HeartIcon from "../../../Image/Icons/HeartIcon";
import UserCircleIcon from "../../../Image/Icons/UserCircleIcon";
import styles from "./CommentItem.module.css";
import Button from "../../../Components/Button/Button";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../atoms/atoms";

const getFormattedDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}, ${dateObj.getHours()}:${dateObj
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

const CommentItem = ({
  id,
  writer,
  date,
  description,
  postWriter,
  inputRef,
  onDelete,
  onUpdate,
}) => {
  const loginUserId = useAtomValue(userIdAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [isOnChange, setIsOnChange] = useState(false);
  const [changeInput, setChangeInput] = useState(description);

  const changeInputRef = useRef();

  const isPostWriter = () => postWriter === writer;
  const isCommentWriter = () => String(loginUserId) === String(writer);
  const onClickIcon = () => {
    setIsOpen(!isOpen);
  };

  const onClickReply = () => {
    inputRef.current.focus();
  };

  const onClickDelete = () => {
    onDelete(id);
  };

  const onChangeInput = (e) => {
    setChangeInput(e.target.value);
  };

  const onClickCompleteUpdate = () => {
    if (changeInput === description) {
      setIsOnChange(false);
      return;
    }
    if (changeInput === "") {
      changeInputRef.current.focus();
      return;
    }
    onUpdate(id, changeInput);
  };

  const onClickCancelUpdate = () => {
    setIsOnChange(false);
  };

  return (
    <div className={styles.CommentItem}>
      {isOpen && (
        <div className={styles.CommentItem__menu}>
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
          <div>{writer}</div>
          <div>{getFormattedDate(date)}</div>
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
                      borderColor: "var(--text-color2)",
                    }
                  : {}
              }
            />
          ) : (
            description
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
