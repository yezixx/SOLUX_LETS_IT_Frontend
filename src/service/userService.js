import apiClient from "./apiClient";

// 카카오 api 받고 처리하는 로직에 맞게 수정 필요
export const getUser = (userId) => {
  return apiClient.get(`/users/${userId}`);
};

export const createUser = (userData) => {
  return apiClient.post("/users", userData);
};

// 회원 탈퇴 (UI에 없음)
export const deleteUser = (userId) => {
  return apiClient.delete(`/users/delete/${userId}`);
};

// 로그아웃
export const logout = (userId) => {
  return apiClient.post("/users/logout", userId);
};

// 개인 정보 수정 (UI에 없음)
export const updateUser = (userId, updatedUserData) => {};
