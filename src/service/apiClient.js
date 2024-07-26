import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.202.1:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
