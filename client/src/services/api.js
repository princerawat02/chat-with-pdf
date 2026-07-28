import axios from "axios";

const api = axios.create({
  baseURL: "https://chat-with-pdf-1-tbrj.onrender.com",
});

export default api;