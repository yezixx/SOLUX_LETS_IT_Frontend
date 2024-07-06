import "./TeamCalendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";

const mock_events = [
  { title: "event 1", date: "2024-07-12" },
  { title: "event 2", date: "2024-07-15" },
  {
    title: "event 3",
    start: "2024-07-01",
    end: "2024-07-03",
  },
];
const TeamCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const onDateClick = () => {
    console.log("달력 클릭");
    openDialog();
  };

  return (
    <div className="calendar">
      {isOpen && <ScheduleDialog closeDialog={closeDialog} />}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={mock_events}
        timeZone="local"
        locale="kr"
        selectable="true"
        dateClick={onDateClick}
      />
    </div>
  );
};

export default TeamCalendar;
