import styles from "./TeamCalendar.module.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

const TeamCalendar = () => {
  return (
    <div className={styles.TeamCalendarWrap}>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            end: "today,prev,next",
          }}
          height={"600px"}
        />
      </div>
    </div>
  );
};

export default TeamCalendar;
