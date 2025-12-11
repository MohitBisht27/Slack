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

export const logoutUser = () => {
  return api.post("/logout");
};

export const getCurrentUser = () => {
  return api.get("/current-user");
};

export const updateUserAvatar = (formData) => {
  return api.patch("/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateUserCoverImage = (formData) => {
  return api.patch("/cover-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateAccountDetails = (formData) => {
  return api.patch("/update-account", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const changeCurrentPassword = (data) => {
  return api.post("/change-password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
