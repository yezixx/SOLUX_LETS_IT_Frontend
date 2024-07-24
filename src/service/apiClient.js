import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.20.8.134:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
