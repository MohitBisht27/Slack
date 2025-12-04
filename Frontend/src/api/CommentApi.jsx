import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/comments",
  withCredentials: true,
});
export const addComment = (articleId, content, parentCommentId = null) => {
  const payload = parentCommentId ? { content, parentCommentId } : { content };
  return api.post(`/${articleId}`, payload);
};

export const getCommentsForArticle = (articleId) => {
  return api.get(`/${articleId}`);
};

export const updateComment = (commentId, data) => {
  return api.put(`/${commentId}`, data);
};

export const deleteComment = (commentId) => {
  return api.delete(`/${commentId}`);
};

export const toggleCommentLike = (commentId) => {
  return api.post(`/${commentId}/like`);
};
