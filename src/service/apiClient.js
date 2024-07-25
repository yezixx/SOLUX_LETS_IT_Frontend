import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://58fa-1-209-144-251.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default apiClient;
