import { useContext, useRef, useState } from "react";
import Button from "../../../../../components/button/Button";
import XIcon from "../../../../../image/icons/XIcon";
import styles from "./ScheduleDialog.module.css";
import { TeamDispatchContext } from "../../../Teamboard";

const ScheduleDialog = ({ selectedDate, closeDialog }) => {
  const { onCreateEvent } = useContext(TeamDispatchContext);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const [description, setDescription] = useState("");

  const titleRef = useRef();
  const descriptionRef = useRef();

  const onClickAdd = () => {
    if (titleRef.current.value === "") {
      titleRef.current.focus();
      return;
    }

    if (descriptionRef.current.value === "") {
      descriptionRef.current.focus();
      return;
    }

    onCreateEvent(title, startDate, endDate, description);
    closeDialog();
  };

  const onChangeTitle = (e) => {
    if (e.target.value.length > 14) {
      return;
    }
    setTitle(e.target.value);
  };

  const onChangeStartDate = (e) => {
    if (e.target.value > endDate) {
      alert("시작 날짜가 종료 날짜보다 늦을 수 없습니다.");
      return;
    }
    setStartDate(e.target.value);
  };

  const onChangeEndDate = (e) => {
    if (e.target.value < startDate) {
      alert("종료 날짜가 시작 날짜보다 빠를 수 없습니다.");
      return;
    }
    setEndDate(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className={styles.scheuleDialog}>
      <div className={styles.scheuleDialog__container}>
        {/* 상단 */}
        <div className={styles.scheuleDialog__header}>
          <div className={styles.scheuleDialog__label}>일정 추가</div>
          <div className={styles.scheuleDialog__xButton}>
            <Button
              text={<XIcon width="15px" height="15px" />}
              onClick={closeDialog}
              type="NONE__TEXT-TC2"
            />
          </div>
        </div>
        {/* 일정 이름 */}
        <div className={styles.scheuleDialog__section}>
          <div className={styles.scheuleDialog__innerLabel}>일정 이름</div>
          <div>
            <input
              ref={titleRef}
              className={`${styles.scheuleDialog__input} ${styles["scheuleDialog__input--text"]}`}
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="일정 이름을 입력해주세요."
            ></input>
          </div>
        </div>
        {/* 일정 날짜 선택 */}
        <div className={styles.scheuleDialog__section}>
          <div className={styles.scheuleDialog__innerLabel}>날짜</div>
          <div>
            <input
              className={`${styles.scheuleDialog__input} ${styles["scheuleDialog__input--date"]}`}
              type="date"
              value={startDate}
              onChange={onChangeStartDate}
            ></input>
          </div>
          ~
          <div>
            <input
              className={`${styles.scheuleDialog__input} ${styles["scheuleDialog__input--date"]}`}
              type="date"
              value={endDate}
              onChange={onChangeEndDate}
            ></input>
          </div>
        </div>
        <div className={styles.scheuleDialog__section}>
          <div className={styles.scheuleDialog__innerLabel}>설명</div>
          <div>
            <textarea
              ref={descriptionRef}
              className={styles.scheuleDialog__textarea}
              placeholder="일정 설명을 입력해주세요."
              value={description}
              onChange={onChangeDescription}
            ></textarea>
          </div>
        </div>
        <div className={styles.scheuleDialog__button}>
          <Button text="추가" type="NONE__TEXT-MC2-12" onClick={onClickAdd} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleDialog;
