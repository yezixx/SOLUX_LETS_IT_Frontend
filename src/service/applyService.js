import apiClient from "./apiClient";

// 지원자 목록 조회 - 내 프로젝트 > 구인/신청 프로젝트 화면 - 구인중
export const getAppicantList = (postId) => {
  return apiClient.get(`/apply/${postId}/list`);
};

// 지원서 등록 - 프로젝트 지원서에서 제출 클릭 시
export const submitApply = (postId, userId, applyData) => {
  return apiClient.post(`/apply/${postId}/write/${userId}`, applyData);
};

// 지원서 보기
export const getApply = (applyId) => {
  return apiClient.get(`/apply/${applyId}`);
};

// 나의 지원서 취소
export const deleteapply = (applyId) => {
  return apiClient.delete(`/apply/${applyId}/delete`);
};

// 지원서 승인
export const approveApply = (postId, applyId) => {
  return apiClient.put(`/apply/${postId}/list/${applyId}/approval`);
};

// 지원서 거절
export const rejectApply = (postId, applyId) => {
  return apiClient.put(`/apply/${postId}/list/${applyId}/reject`);
};
