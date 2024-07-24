import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://d3c2-1-209-144-253.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
