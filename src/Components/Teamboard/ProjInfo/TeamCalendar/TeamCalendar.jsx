import styles from "./TeamCalendar.module.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

const TeamCalendar = () => {
  return (
    <div className={styles.calendar}>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={"600px"}
          events={[
            { title: "event 1", date: "2024-06-12" },
            { title: "event 2", date: "2024-06-15" },
          ]}
        />
      </div>
    </div>
  );
};

export default TeamCalendar;
