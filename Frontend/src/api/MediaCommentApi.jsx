import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/mediaComments",
  withCredentials: true,
});

export const addMediaComment = (mediaId, content, parentCommentId = null) => {
  const payload = { content, parentCommentId: parentCommentId || null };
  return api.post(`/m/${mediaId}`, payload);
};

export const getMediaComments = (mediaId, page = 1, limit = 10) => {
  return api.get(`/m/${mediaId}?page=${page}&limit=${limit}`);
};

export const updateMediaComment = (commentId, content) => {
  return api.patch(`/m/c/${commentId}`, { content });
};

export const deleteMediaComment = (commentId) => {
  return api.delete(`/m/c/${commentId}`);
};

export const toggleMediaCommentLike = (commentId) => {
  return api.post(`/m/like/${commentId}`);
};
