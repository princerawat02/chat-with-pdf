import axios from "axios";

const api = axios.create({
  baseURL: "https://chat-with-pdf-811n.onrender.com",
});

export default api;