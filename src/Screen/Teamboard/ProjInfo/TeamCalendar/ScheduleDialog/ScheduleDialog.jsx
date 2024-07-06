import Button from "../../../../../Components/Button/Button";
import XIcon from "../../../../../Image/Icons/XIcon";
import styles from "./ScheduleDialog.module.css";

const ScheduleDialog = ({ closeDialog }) => {
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
              className={`${styles.scheuleDialog__input} ${styles["scheuleDialog__input--text"]}`}
              type="text"
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
            ></input>
          </div>
          ~
          <div>
            <input
              className={`${styles.scheuleDialog__input} ${styles["scheuleDialog__input--date"]}`}
              type="date"
            ></input>
          </div>
        </div>
        <div className={styles.scheuleDialog__section}>
          <div className={styles.scheuleDialog__innerLabel}>설명</div>
          <div>
            <textarea
              className={styles.scheuleDialog__textarea}
              placeholder="일정 설명을 입력해주세요."
            ></textarea>
          </div>
        </div>
        <div
          className={`${styles.scheuleDialog__section} ${styles["scheuleDialog__button"]}`}
        >
          <Button text="추가" type="NONE__TEXT-MC2-12" />
          <Button text="닫기" type="NONE__TEXT-MC2-12" onClick={closeDialog} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleDialog;
