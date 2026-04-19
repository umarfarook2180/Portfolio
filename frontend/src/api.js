import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

export const getProfile = () => API.get("/profile").then(r => r.data.data);
export const getEducation = () => API.get("/profile/education").then(r => r.data.data);
export const getAchievements = () => API.get("/profile/achievements").then(r => r.data.data);
export const getProjects = (params) => API.get("/projects", { params }).then(r => r.data.data);
export const getProject = (id) => API.get(`/projects/${id}`).then(r => r.data.data);
export const getPosts = (params) => API.get("/blog", { params }).then(r => r.data.data);
export const getPost = (slug) => API.get(`/blog/${slug}`).then(r => r.data.data);
export const sendContact = (data) => API.post("/contact", data).then(r => r.data);

export default API;
