import "./TeamCalendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import { createContext, useContext, useState } from "react";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";
import ScheduleContent from "./ScheduleContent/ScheduleContent";
import { TeamStateContext } from "../../Teamboard";

//export const CalendarStateContext = createContext();
//export const CalendarDispatchContext = createContext();

/*function scheduleReducer(state, action) {
  switch (action.type) {
    case "GET_EVENT":
      return action.data;
    case "CREATE_EVENT":
      return [...state, action.data];
    case "DELETE_EVENT":
      return state.filter((item) => String(item.id) !== String(action.data));
    default:
      return state;
  }
}*/

const TeamCalendar = () => {
  const { scheduleData } = useContext(TeamStateContext);
  /*const scheduleData = [
    {
      id: "3",
      title: "전체회의",
      start: "2024-08-29",
      end: "2024-09-05",
      description: "저녁 9시에 회의합니다.",
    },
    {
      id: "5",
      title: "부스팅데이",
      start: "2024-07-29",
      end: "2024-08-05",
      description: "완성할때까지 숨참기.",
    },
    {
      id: "6",
      title: "12312313",
      start: "2024-07-10",
      end: "2024-07-10",
      description: "2151451",
    },
    {
      id: "7",
      title: "123",
      start: "2024-09-17",
      end: "2024-09-21",
      description: "123",
    },
  ];*/
  console.log(scheduleData);

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
