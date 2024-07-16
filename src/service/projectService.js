import apiClient from "./apiClient";

// 나의 구인프로젝트 목록 조회 - 내 프로젝트 > 구인/신청 프로젝트 화면 - 구인중
export const getMyPojects = (userId) => {
  return apiClient.get(`/project/${userId}/organizinglist`);
};

// 나의 신청프로젝트 목록 조회 - 내 프로젝트 > 구인/신청 프로젝트 화면 - 신청중
export const getMyAppliedProjects = (userId) => {
  return apiClient.get(`/project/${userId}/organizinglist`);
};

// 나의 참여프로젝트 목록 조회 - 내 프로젝트 > 참여 프로젝트 화면
export const getMyOnGoingProjects = (userId) => {
  return apiClient.get(`/project/${userId}/ongoinglist`);
};

// 나의 완료한 프로젝트 목록 조회 - 내 프로젝트 > 참여 프로젝트 화면
export const getMyFinishedProjects = (userId) => {
  return apiClient.get(`/project/${userId}/ongoinglist`);
};
