import axios from "axios";
const updateApiClientToken = (token) => {
  apiClient.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
};
const token = localStorage.getItem("token");
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "ngrok-skip-browser-warning": "true",
  },
});
export default apiClient;
export { updateApiClientToken };
