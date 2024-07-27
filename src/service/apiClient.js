import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.20.6.89:8080",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default apiClient;
