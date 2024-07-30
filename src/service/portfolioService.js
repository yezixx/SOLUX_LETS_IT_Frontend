import apiClient from "./apiClient";

//포트폴리오 리스트업
export const getPortfolioList = async () => {
  try {
    const response = await apiClient.get("/portfolios/total/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};
//포트폴리오 게시판 (board) 리스트업 (조회)
export const getMyPortfolios = async (teamId) => {
  try {
    const response = await apiClient.get(`/portfolios/${teamId}/list`);
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching project board list:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};
//포트폴리오 상세 조회
export const getMyDetailPortfolios = async (teamId, prtId) => {
  try {
    const response = await apiClient.get(
      `/portfolios/${teamId}/details/${prtId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching project detail list:", error);
    throw error;
  }
};
// 포트폴리오 작성
export const postPortfolios = async (teamId, postData) => {
  try {
    const response = await apiClient.post(
      `portfolios/${teamId}/write`,
      postData
    );
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching post portfolio:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};

// AI 포트폴리오 조회
export const getMyAIPortfolios = async (userId) => {
  try {
    const response = await apiClient.get(`/project/${userId}/ongoinglist`);
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching AI portfolio :", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};
