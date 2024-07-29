import apiClient from "./apiClient";

// 지원자 목록 조회
export const getApplicantList = async (postId) => {
  try {
    const response = await apiClient.get(`/apply/${postId}/list`);
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching applicant list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};

// 지원서 등록
export const submitApply = async (postId, applyData) => {
  try {
    const response = await apiClient.post(`/apply/${postId}/write`, applyData);
    return response.data; //성공메세지 반환
  } catch (error) {
    console.error("Error fetching applicant list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};

// 지원서 보기
export const getApply = async (applyId) => {
  try {
    const response = await apiClient.get(`/apply/${applyId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching apply:", error);
    throw error;
  }
};

// 나의 지원서 취소 (ui 없음, 추후 구현)
export const deleteApply = async (applyId) => {
  try {
    const response = await apiClient.delete(`/apply/${applyId}/delete`);
    return response.data;
  } catch (error) {
    console.error("Error deleting apply:", error);
    throw error;
  }
};

// 지원서 승인
export const approveApply = async (postId, applyId) => {
  try {
    const response = await apiClient.get(
      `/apply/${postId}/list/${applyId}/approval`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting apply:", error);
    throw error;
  }
};

// 지원서 거절
export const rejectApply = async (postId, applyId) => {
  try {
    const response = await apiClient.get(
      `/apply/${postId}/list/${applyId}/reject`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting apply:", error);
    throw error;
  }
};

// 현재 승인된 지원자 목록 리스트업
export const approveApplicants = async (postId) => {
  try {
    const response = await apiClient.get(`/apply/${postId}/approvedlist`);
    return response.data;
  } catch (error) {
    console.error("Error deleting apply:", error);
    throw error;
  }
};
