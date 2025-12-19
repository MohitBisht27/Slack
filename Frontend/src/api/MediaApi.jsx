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

export const getReels = async (page = 1, limit = 5) => {
  return api.get(`/reels?page=${page}&limit=${limit}`);
};
export const getImages = async (page = 1, limit = 5) => {
  return api.get(`/image?page=${page}&limit=${limit}`);
};

export const deleteMedia = async (mediaId) => {
  return api.delete(`/delete/${mediaId}`);
};

export const toggleMediaLike = async (mediaId) => {
  return api.patch(`/toggle/like/${mediaId}`);
};
