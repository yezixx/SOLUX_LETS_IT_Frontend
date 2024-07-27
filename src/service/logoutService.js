import apiClient from "./apiClient";

//로그아웃
export const logoutService = async () => {
  try {
    const response = await apiClient.post("/logout");
    return response.data; // 서버에서 받은 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching logout service:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전달합니다.
  }
};
