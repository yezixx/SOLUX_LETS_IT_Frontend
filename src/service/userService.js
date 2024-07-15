import apiClient from "./apiClient";

export const getUser = (userId) => {
  return apiClient.get(`/users/${userId}`);
};

export const createUser = (userData) => {
  return apiClient.post("/users", userData);
};
