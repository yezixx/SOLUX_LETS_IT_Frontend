import styles from "./AttendanceList.module.css";
import AttendanceItem from "./AttendanceItem/AttendanceItem";
import { useContext } from "react";
import { TeamStateContext } from "../../Teamboard";

const AttendanceList = () => {
  const { meetingData } = useContext(TeamStateContext);
  return (
    <div className={styles.attendanceList}>
      <div className={styles.attendanceList__item}>
        {meetingData.map((meeting) => (
          <AttendanceItem
            key={meeting.id}
            id={meeting.id}
            date={meeting.date}
          />
        ))}
        <AttendanceItem
          key={meetingData.length + 1}
          id={meetingData.length + 1}
          date={new Date().toISOString().split("T")[0]}
          iscurrent={true}
        />
      </div>
    </div>
  );
};

export default AttendanceList;
