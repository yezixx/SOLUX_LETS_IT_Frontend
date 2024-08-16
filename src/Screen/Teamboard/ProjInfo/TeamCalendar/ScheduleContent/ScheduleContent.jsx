import { useContext } from "react";
import Button from "../../../../../Components/Button/Button";
import XIcon from "../../../../../Image/Icons/XIcon";
import styles from "./ScheduleContent.module.css";
import { CalendarDispatchContext } from "../TeamCalendar";

const ScheduleContent = ({ event, closeInfo }) => {
  const { onDeleteEvent } = useContext(CalendarDispatchContext);

  const onClickDelete = () => {
    onDeleteEvent(event.id);
    closeInfo();
  };

  return (
    <div className={styles.ScheduleContent}>
      <div className={styles.ScheduleContent__container}>
        {/* 상단 */}
        <div className={styles.ScheduleContent__header}>
          <div className={styles.ScheduleContent__label}>일정 정보</div>
          <div className={styles.ScheduleContent__xButton}>
            <Button
              text={<XIcon width="15px" height="15px" />}
              onClick={closeInfo}
              type="NONE__TEXT-TC2"
            />
          </div>
        </div>
        {/* 일정 이름 */}
        <div className={styles.ScheduleContent__section}>
          <div className={styles.ScheduleContent__innerLabel}>일정 이름</div>
          <div className={styles.ScheduleContent__info}>{event.title}</div>
        </div>
        {/* 일정 날짜 선택 */}
        <div className={styles.ScheduleContent__section}>
          <div className={styles.ScheduleContent__innerLabel}>날짜</div>
          <div className={styles.ScheduleContent__info}>{event.startStr}</div>
          {event.end ? (
            <>
              <div>~</div>
              <div className={styles.ScheduleContent__info}>
                {new Date(event.end.getTime() - 1).toISOString().split("T")[0]}
              </div>
            </>
          ) : null}
        </div>
        <div className={styles.ScheduleContent__section}>
          <div className={styles.ScheduleContent__innerLabel}>설명</div>
          <div className={styles.ScheduleContent__description}>
            {event.extendedProps.description}
          </div>
        </div>
        <div className={styles.ScheduleContent__button}>
          <Button
            text="삭제"
            type="NONE__TEXT-MC2-12"
            onClick={onClickDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleContent;
