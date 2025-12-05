import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/userLike",
  withCredentials: true,
});

export const toggleCommentLike = async (commentId) => {
  try {
    const response = await api.post(`/comments/${commentId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking comment:", error);
    throw error;
  }
};
