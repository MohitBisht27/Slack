import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/userArticle",
  withCredentials: true,
});

export const addProblem = (data) => {
  return api.post("/article", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getAllProblem = () => {
  return api.get("/getAllArticles");
};

//Testing
// export const addProblem = (data) => {
//   const token =
//
//   return api.post("/article", data, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
