import apiClient from "./apiClient";
/*
- 팀원마다 강퇴 제안 받았는지 여부와 강퇴 투표중이라면 몇표 받았는지
- 회의 기록 데이터 필요
*/

// 팀게시판 생성
export const createTeam = async (postId, teamData) => {
  try {
    const response = await apiClient.post(`/team/${postId}/create`, teamData);
    return response.data;
  } catch (error) {
    console.error("Error fetching create team");
    throw error;
  }
};

// 팀게시파 메인 - 팀게시판 프로젝트 정보 화면
export const getTeam = async (teamId) => {
  try {
    const response = await apiClient.get(`/team/${teamId}/main`);
    return response.data;
  } catch (error) {
    console.error("Error fetching get team", error);
    throw error;
  }
};

// 팀게시판 강퇴 제안
export const proposeKick = (teamId) => {
  return apiClient.post(`/team/${teamId}/report`);
};

// 강퇴 동의 버튼 ** 버튼 눌렀을 때의 동작이면 post여야...?
export const agreeKick = (teamId) => {
  return apiClient.get(`/team/${teamId}/agree`);
};

// 팀게시판 신고 ** 버튼 눌렀을 때의 동작이면 post여야...?
export const reportMember = (teamId) => {
  return apiClient.get(`/team/${teamId}/resign`);
};

// 팀게시판 프로젝트 관리(회의 인증)
export const manageTeam = (teamId) => {
  return apiClient.get(`/team/${teamId}/info`);
};

// 팀게시판 정보 수정
export const updateTeam = async (teamId, updatedTeamData) => {
  try {
    const response = await apiClient.patch(
      `/team/${teamId}/update`,
      updatedTeamData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating team information:", error.message || error);
    throw error;
  }
};

// 팀장 위임
export const delegateTeamLeader = async (teamId, userId) => {
  try {
    console.log("delegateTeamLeader", teamId, userId);
    const response = await apiClient.patch(`/team/${teamId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delegate team leader", error);
    throw error;
  }
};

// 팀원 평가 - 평가하기 버튼 눌렀을 때
export const evaluateMember = async (teamId, userId, targetId, value) => {
  try {
    const response = await apiClient.post(
      `/team/evaluation/${teamId}/${userId}/${targetId}`,
      value
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluate member", error);
    if (error.response) {
      // 서버가 응답을 반환했지만 상태 코드가 오류를 나타냄
      console.error("Error response received:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data); // 서버에서 반환한 에러 메시지
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못함
      console.error("No response received:", error.request);
    } else {
      // 설정 문제나 다른 에러
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
};

export const getEvaluatedList = async (teamId, userId) => {
  try {
    const response = await apiClient.get(
      `team/evaluation/info/${teamId}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluated member list", error);
    throw error;
  }
};

// 프로젝트 종료 - 프로젝트 종료 버튼 눌렀을 때
export const completeProject = async (teamId) => {
  try {
    const response = await apiClient.patch(`/team/${Number(teamId)}/complete`);
    return response.data;
  } catch (error) {
    console.error("Error fetching complete project", error);
    throw error;
  }
};

// 캘린더 일정 데이터 가져오기
export const getSchedule = async (teamId) => {
  try {
    const responese = await apiClient.get(`team/calendar/${teamId}/info`);
    return responese.data;
  } catch (error) {
    console.error("Error fetching get schedule", error);
    throw error;
  }
};

// 캘린더 일정 등록
export const createSchedule = async (teamId, scheduleData) => {
  try {
    const response = await apiClient.post(
      `team/calendar/${teamId}/create`,
      scheduleData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching create schedule", error);
    throw error;
  }
};

// 캘린더 일정 삭제
export const deleteSchedule = async (calendarId) => {
  try {
    const response = await apiClient.delete(
      `team/calendar/${calendarId}/delete`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching delete schedule", error);
    throw error;
  }
};

// 팀게시판 마감 여부 확인
export const checkTeamCompleted = async (teamId) => {
  try {
    const response = await apiClient.get(`team/${teamId}/is/complete`);
    return response.data;
  } catch (error) {
    console.error("Error fetching check team close", error);
    throw error;
  }
};
