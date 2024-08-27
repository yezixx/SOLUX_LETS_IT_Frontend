import "./TeamCalendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import ScheduleDialog from "./scheduleDialog/ScheduleDialog";
import ScheduleContent from "./scheduleContent/ScheduleContent";
import {
  createSchedule,
  deleteSchedule,
  getSchedule,
} from "../../../../service/teamService";
import { TeamStateContext } from "../../Teamboard";

export const CalendarStateContext = createContext();
export const CalendarDispatchContext = createContext();

function scheduleReducer(state, action) {
  switch (action.type) {
    case "GET":
      return action.data.map((item) => {
        return {
          id: String(item.calendarId),
          title: String(item.title),
          start: String(item.startDate),
          end: String(item.endDate),
          description: String(item.description),
        };
      });
    // case "CREATE_EVENT":
    //   return [...state, action.data];
    // case "DELETE_EVENT":
    //   return state.filter((item) => String(item.id) !== String(action.data));
    default:
      return state;
  }
}

const TeamCalendar = () => {
  const [scheduleData, scheduleDispatch] = useReducer(scheduleReducer, []);
  const { teamId } = useContext(TeamStateContext);
  console.log(scheduleData);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  const fetchScheduleData = async () => {
    try {
      const data = await getSchedule(teamId);
      await scheduleDispatch({
        type: "GET",
        data: data.data,
      });
    } catch (error) {
      console.log("schedule error", error);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const onCreateEvent = async (title, startDate, endDate, description) => {
    if (startDate !== endDate) {
      const newDate = new Date(endDate);
      newDate.setDate(newDate.getDate() + 1);
      endDate = newDate.toISOString().split("T")[0];
    }
    await createSchedule(teamId, {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
    });
    await fetchScheduleData();
  };

  const onDeleteEvent = async (targetId) => {
    if (confirm("일정을 삭제하시겠습니까?")) {
      await deleteSchedule(targetId);
      await fetchScheduleData();
    }
  };

  const onDateClick = (date) => {
    if (isOpenInfo) setIsOpenInfo(false);
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
    if (isOpenDialog) setIsOpenDialog(false);
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
      <CalendarStateContext.Provider value={scheduleData}>
        <CalendarDispatchContext.Provider
          value={{ scheduleDispatch, onCreateEvent, onDeleteEvent }}
        >
          {isOpenDialog && (
            <ScheduleDialog
              selectedDate={selectedDate}
              closeDialog={closeDialog}
            />
          )}
          {isOpenInfo && (
            <ScheduleContent event={selectedEvent} closeInfo={closeInfo} />
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
        </CalendarDispatchContext.Provider>
      </CalendarStateContext.Provider>
    </div>
  );
};

export default TeamCalendar;
