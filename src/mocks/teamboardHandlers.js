import { http, HttpResponse } from "msw";
import { teamData } from "./teamData/teamData";
import { scheduleData } from "./teamData/scheduleData";

export const teamboardHandlers = [
  // 팀 정보
  http.get("/api/team/1/main", () => {
    return HttpResponse.json({
      data: teamData,
    });
  }),
  // 일정 불러오기
  http.get("/api/team/calendar/1/info", () => {
    return HttpResponse.json({
      data: scheduleData,
    });
  }),
  // 일정 추가
  http.post("/api/team/calendar/1/create", async ({ request }) => {
    const res = await request.json();
    const newData = {
      calendarId: String(scheduleData.length + 1),
      ...res,
    };
    console.log(newData);
    scheduleData.push(newData);
    return HttpResponse.json({
      data: newData,
    });
  }),
  // 일정 삭제
  http.delete("/api/team/calendar/1/delete", async () => {
    scheduleData.pop(); // 에러 나는 중 -> 이후에 수정
  }),
];
