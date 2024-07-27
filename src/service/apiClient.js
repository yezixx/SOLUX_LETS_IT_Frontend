import axios from "axios";

const updateApiClientToken = (token) => {
  apiClient.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
};

const token = localStorage.getItem("token");
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

export default apiClient;
export { updateApiClientToken };
