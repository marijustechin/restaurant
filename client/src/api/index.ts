import axios from "axios";

export const API_URL = "http://localhost:3003/api/v1";

const $api = axios.create({
  // kad prie kiekvienos užklausos automatiškai
  // prisikabintų slapukai
  withCredentials: true,
  baseURL: API_URL,
});

// užklausų ir atsakymų perėmėjai - interceptors
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

export default $api;
