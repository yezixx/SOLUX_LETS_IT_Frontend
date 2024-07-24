import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.23.1818080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
