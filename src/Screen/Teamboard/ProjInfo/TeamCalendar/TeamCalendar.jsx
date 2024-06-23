import "./TeamCalendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

const TeamCalendar = () => {
  const events = [
    { title: "event 1", date: "2024-06-12" },
    { title: "event 2", date: "2024-06-15" },
  ];

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        timeZone="local"
        locale="kr"
        formatDate="en"
      />
    </div>
  );
};

export default TeamCalendar;
