import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
  withCredentials: true,
});

export const registerUser = (formData) => {
  return api.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const loginUser = (formData) => {
  return api.post("/login", formData, {
    headers: { "Content-Type": "application/json" },
  });
};
