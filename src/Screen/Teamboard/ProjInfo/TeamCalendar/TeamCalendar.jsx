import "./TeamCalendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";
import ScheduleContent from "./ScheduleContent/ScheduleContent";

const mock_events = [
  {
    id: 0,
    title: "event 1",
    start: "2024-07-01",
    end: "2024-07-01",
    description: "test",
  },
  {
    id: 1,
    title: "event 2",
    start: "2024-07-03",
    end: "2024-07-03",
    description: "test",
  },
  {
    id: 2,
    title: "event 3",
    start: "2024-07-01",
    end: "2024-07-03",
    description: "test",
  },
];

const TeamCalendar = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [events, setEvents] = useState(mock_events);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  const idRef = useRef(3);

  const onDateClick = (date) => {
    setSelectedDate(date.dateStr);
    openDialog();
  };

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const onEventClick = (e) => {
    console.log(e.event);
    openInfo();
    setSelectedEvent(e.event);
  };

  const openInfo = () => {
    setIsOpenInfo(true);
  };

  const closeInfo = () => {
    setIsOpenInfo(false);
  };

  const onCreateEvent = (title, startDate, endDate, description) => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 1);
    const newEndDate = newDate.toISOString().split("T")[0];

    setEvents([
      ...events,
      {
        id: idRef.current++,
        title: title,
        start: startDate,
        end: newEndDate,
        description: description,
      },
    ]);
    closeDialog();
  };

  const onDeleteEvent = (targetId) => {
    if (confirm("일정을 삭제하시겠습니까?")) {
      setEvents(
        events.filter((event) => Number(event.id) !== Number(targetId))
      );
      closeInfo();
    }
  };

  return (
    <div className="calendar">
      {isOpenDialog && (
        <ScheduleDialog
          selectedDate={selectedDate}
          onCreateEvent={onCreateEvent}
          closeDialog={closeDialog}
        />
      )}
      {isOpenInfo && (
        <ScheduleContent
          event={selectedEvent}
          closeDialog={closeDialog}
          closeInfo={closeInfo}
          onDeleteEvent={onDeleteEvent}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        timeZone="local"
        locale="kr"
        selectable="true"
        dateClick={onDateClick}
        eventClick={onEventClick}
      />
    </div>
  );
};

export default TeamCalendar;
