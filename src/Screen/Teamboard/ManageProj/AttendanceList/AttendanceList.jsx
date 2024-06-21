import styles from "./AttendanceList.module.css";
import AttendanceItem from "./AttendanceItem/AttendanceItem";

const AttendanceList = () => {
  const meetings = [
    { id: 1, date: "2024-04-01", isCompleted: true },
    { id: 2, date: "2024-04-06", isCompleted: true },
    { id: 3, date: "2024-04-06", isCompleted: false },
  ];
  return (
    <div className={styles.attendanceList}>
      <div className={styles.attendanceList__item}>
        {meetings.map((meeting) => (
          <AttendanceItem
            key={meeting.id}
            id={meeting.id}
            date={meeting.date}
            isCompleted={meeting.isCompleted}
            length={meetings.length}
          />
        ))}
      </div>
    </div>
  );
};

export default AttendanceList;
