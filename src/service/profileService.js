import apiClient from "./apiClient";

// 프로필 조회
export const getProfile = async () => {
  try {
    const response = await apiClient.get(`profile/my`);
    return response.data; //성공메세지 반환
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};
// 프로필 수정 - 프로필 수정 화면에서 저장 버튼
export const updateProfile = (userId, updatedProfileData) => {
  try {
    const response = apiClient.patch(
      `/profile/${userId}/modify`,
      updatedProfileData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// 프로필 이미지 저장
export const saveProfileImage = async (userId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", imageFile);
    const response = await apiClient.post(
      `/profile/${userId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving profile image:", error);
    throw error;
  }
};

//지원자 프로필 조회
export const getApplyProfile = async (userId) => {
  try {
    const response = await apiClient.get(`profile/${userId}`);
    return response.data; //성공메세지 반환
  } catch (error) {
    console.error("Error fetching applicant list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};
