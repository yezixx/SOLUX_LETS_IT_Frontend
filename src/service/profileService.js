import apiClient from "./apiClient";

// 프로필 조회
export const getProfile = async () => {
  try {
    const response = await apiClient.get(`profile/my`);
    return response.data; //성공메세지 반환
  } catch (error) {
    console.error("Error fetching applicant list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};
// 프로필 수정 - 프로필 수정 화면에서 저장 버튼
export const updateProfile = (userId, updatedProfileData) => {
  return apiClient.patch(`/profile/${userId}/modify`, updatedProfileData);
};
