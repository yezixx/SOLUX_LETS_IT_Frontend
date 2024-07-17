import CheckIcon from "../../../../../Image/Icons/CheckIcon";
import styles from "./AttendanceItem.module.css";

const AttendanceItem = ({ id, date, iscurrent }) => {
  const classNames = `
    ${styles.attendanceItem__block}
    ${id === 1 ? styles["attendanceItem__block--first"] : ""}
    ${iscurrent ? styles["attendanceItem__block--last"] : ""}
  `;

  return (
    <div className={styles.attendanceItem.trim()}>
      <div className={classNames}>
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
