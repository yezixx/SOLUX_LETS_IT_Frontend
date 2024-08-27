import { http, HttpResponse } from "msw";
import { teamData } from "./teamData/teamData";
import { scheduleData } from "./teamData/scheduleData";
import { evaluateData } from "./teamData/evaluateData";

export const teamboardHandlers = [
  // 팀 정보
  http.get("/api/team/1/main", () => {
    return HttpResponse.json({
      data: teamData,
    });
  }),
  // 팀 정보 수정
  http.patch("/api/team/1/update", async ({ request }) => {
    const res = await request.json();
    teamData.teamName = res.teamName;
    teamData.notionLink = res.notionLink;
    teamData.githubLink = res.githubLink;
    return HttpResponse.json({
      data: teamData,
    });
  }),
  // 팀장 위임
  http.patch("/api/team/1/:userId", async ({ params }) => {
    const { userId } = params;
    teamData.teamMemberInfo.forEach((member) => {
      if (member.userId === userId) {
        member.position = "Team_Leader";
      } else {
        member.position = "Team_Member";
      }
    });
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
  http.delete("/api/team/calendar/:calendarId/delete", async ({ params }) => {
    const { calendarId } = params; // 동적으로 받은 calendarId
    // 일정 삭제: 필터링된 결과를 다시 scheduleData에 반영
    const updatedData = scheduleData.filter(
      (item) => item.calendarId !== calendarId
    );

    // 업데이트된 데이터로 기존 배열을 대체
    scheduleData.length = 0; // 원래 배열 비우기
    scheduleData.push(...updatedData); // 새로운 데이터를 삽입
    return HttpResponse.json({
      data: scheduleData,
    });
  }),
  // 프로젝트 종료
  http.patch("/api/team/1/complete", () => {
    return HttpResponse.json({
      status: 200,
      message: "프로젝트가 종료되었습니다.",
    });
  }),
  // 프로젝트 종료 여부 확인
  http.get("/api/team/1/is/complete", () => {
    return HttpResponse.json({
      data: {
        isComplete: true,
      },
    });
  }),
  // 팀원 평가 정보
  http.get("/api/team/evaluation/info/1/:userId", ({ params }) => {
    const { userId } = params;
    return HttpResponse.json({
      data: evaluateData,
    });
  }),
];
