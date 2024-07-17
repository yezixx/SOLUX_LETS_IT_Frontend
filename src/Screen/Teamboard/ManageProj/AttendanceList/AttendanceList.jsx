import styles from "./AttendanceList.module.css";
import AttendanceItem from "./AttendanceItem/AttendanceItem";
import { useContext } from "react";
import { TeamStateContext } from "../../Teamboard";

const AttendanceList = () => {
  const teamData = useContext(TeamStateContext);
  const meetings = teamData.meetingLog;
  return (
    <div className={styles.attendanceList}>
      <div className={styles.attendanceList__item}>
        {meetings.map((meeting) => (
          <AttendanceItem
            key={meeting.id}
            id={meeting.id}
            date={meeting.date}
          />
        ))}
        <AttendanceItem
          key={meetings.length + 1}
          id={meetings.length + 1}
          date={new Date().toISOString().split("T")[0]}
          iscurrent={true}
        />
      </div>
    </div>
  );
};

export default AttendanceList;
