import apiClient from "./apiClient";

// 지원자 목록 조회
export const getApplicantList = async (postId) => {
  try {
    const response = await apiClient.get(`/apply/${postId}/list`);
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    // 에러를 자세히 파악하기 위한 처리
    if (error.response) {
      // 서버가 요청을 이해하고 있지만 클라이언트에게 접근 권한이 없는 경우
      console.error(
        "Server responded with error:",
        error.response.status,
        error.response.data
      );
      switch (error.response.status) {
        case 400:
          console.error("Bad Request:", error.response.data.message);
          break;
        case 401:
          console.error("Unauthorized:", error.response.data.message);
          break;
        case 403:
          console.error("Forbidden:", error.response.data.message);
          break;
        case 404:
          console.error("Not Found:", error.response.data.message);
          break;
        case 500:
          console.error("Internal Server Error:", error.response.data.message);
          break;
        default:
          console.error(
            "Unexpected Error:",
            error.response.status,
            error.response.data.message
          );
          break;
      }
    } else if (error.request) {
      // 요청이 서버로 전달되었지만 응답을 받지 못한 경우
      console.error("No response received from server:", error.request);
    } else {
      // 요청을 설정하는 동안 문제가 발생한 경우
      console.error("Error setting up the request:", error.message);
    }
    // 에러를 다시 throw하여 호출자에게 전달합니다.
    throw error;
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
