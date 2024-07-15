import apiClient from "./apiClient";

// 프로필 조회
export const getProfile = (userId) => {
  return apiClient.get(`/profile/${userId}`);
};
// 프로필 수정 - 프로필 수정 화면에서 저장 버튼
export const updateProfile = (userId, updatedProfileData) => {
  return apiClient.patch(`/profile/${userId}/modify`, updatedProfileData);
};
