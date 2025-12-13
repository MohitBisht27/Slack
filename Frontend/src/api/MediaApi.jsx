import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/mediaRoute",
  withCredentials: true,
});

export const addDoubtMedia = async (data) => {
  return api.post("/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
