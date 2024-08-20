import { useContext } from "react";
import CheckIcon from "../../../../../image/icons/CheckIcon";
import styles from "./AttendanceItem.module.css";
import { TeamStateContext } from "../../../Teamboard";

const AttendanceItem = ({ id, date, iscurrent }) => {
  const { meetingData } = useContext(TeamStateContext);

  const getNonParticipants = () => {
    if (iscurrent) return [];
    return meetingData.find((meeting) => meeting.id === id).nonParticipants;
  };

  const nonParticipants = getNonParticipants();

  const classNames = `
    ${styles.attendanceItem__block}
    ${id === 1 ? styles["attendanceItem__block--first"] : ""}
    ${iscurrent ? styles["attendanceItem__block--last"] : ""}
  `;

  return (
    <div className={styles.attendanceItem.trim()}>
      <div
        className={classNames}
        title={iscurrent ? "" : `불참한 팀원: ${nonParticipants.join(", ")}`}
      >
        <div className={styles.attendanceItem__icon}>
          <CheckIcon
            width="16px"
            height="16px"
            color={iscurrent ? "var(--main-color2)" : "var(--text-color2)"}
          />
        </div>
        <div className={styles.attendanceItem__text}>{id} 번째 인증</div>
        <div className={styles.attendanceItem__date}>{date}</div>
      </div>
    </div>
  );
};

export default AttendanceItem;
