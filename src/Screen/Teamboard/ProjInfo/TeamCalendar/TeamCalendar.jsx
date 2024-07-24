import "./TeamCalendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext, useState } from "react";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";
import ScheduleContent from "./ScheduleContent/ScheduleContent";
import { TeamStateContext } from "../../Teamboard";

const TeamCalendar = () => {
  const { scheduleData } = useContext(TeamStateContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

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
    openInfo();
    setSelectedEvent(e.event);
  };

  const openInfo = () => {
    setIsOpenInfo(true);
  };

  const closeInfo = () => {
    setIsOpenInfo(false);
  };

  return (
    <div className="calendar">
      {isOpenDialog && (
        <ScheduleDialog selectedDate={selectedDate} closeDialog={closeDialog} />
      )}
      {isOpenInfo && (
        <ScheduleContent
          event={selectedEvent}
          closeDialog={closeDialog}
          closeInfo={closeInfo}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={scheduleData}
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
