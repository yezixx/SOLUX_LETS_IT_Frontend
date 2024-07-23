import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.20.6.43:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
