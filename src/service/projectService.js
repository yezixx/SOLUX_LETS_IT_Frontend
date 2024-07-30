import apiClient from "./apiClient";

// 나의 구인프로젝트 목록 조회 - 내 프로젝트 > 구인/신청 프로젝트 화면 (구인)
export const getMyProjects = async () => {
  try {
    const response = await apiClient.get("/projects/organizinglist");
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching applicant list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};

// // 나의 구인프로젝트 목록 조회 - 내 프로젝트 > 구인/신청 프로젝트 화면 (신청)
export const getMyApplyProjects = async () => {
  try {
    const response = await apiClient.get(`/projects/appliedlist`);
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching applicant list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};

//나의 신청프로젝트 목록 조회 - 내 프로젝트 > 참여 프로젝트 > 진행 중
export const getMyOngoingProjects = async () => {
  try {
    const response = await apiClient.get(`/projects/ongoinglist`);
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching ongoing Projects  list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};

// 나의 신청프로젝트 목록 조회 - 내 프로젝트 > 참여 프로젝트 > 진행 중
export const getCompleteProjects = async () => {
  try {
    const response = await apiClient.get(`/projects/completedlist`);
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching complete Projects list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};
