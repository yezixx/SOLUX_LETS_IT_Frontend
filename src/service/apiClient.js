import axios from "axios";

const token = localStorage.getItem("token");
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

const updateApiClientToken = (token) => {
  apiClient.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
};

export default apiClient;
export { updateApiClientToken };
