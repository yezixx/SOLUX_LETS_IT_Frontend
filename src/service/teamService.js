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
// 일단 생성 및 조회까지

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
export const updateTeam = (teamId, updatedTeamData) => {
  return apiClient.patch(`/team/${teamId}`, updatedTeamData);
};

// 팀원 평가 - 평가하기 버튼 눌렀을 때
export const evaluateMember = (userId) => {
  return apiClient.post(`/team/evaluation/${userId}`);
};

// 프로젝트 종료 - 프로젝트 종료 버튼 눌렀을 때
export const completeProject = (teamId, teamData) => {
  return apiClient.patch(`/team/${teamId}/completed`, teamData);
};

// 캘린더 일정 등록
export const createSchedule = (teamId, scheduleData) => {
  return apiClient.post(`/team/${teamId}/schedule`, scheduleData);
};

// 캘린더 일정 삭제
export const deleteSchedule = (teamId, scheduleData) => {
  return apiClient.patch(`/team/${teamId}/schedule`, scheduleData);
};
