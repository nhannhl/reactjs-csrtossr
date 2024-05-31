import axiosClient from "./axiosClient";

const testApi = {
  getUsers() {
    const url = "users";
    return axiosClient.get(url);
  },
  getUser(id) {
    const url = `users/${id}`;
    return axiosClient.get(url);
  },
  getPosts() {
    const url = "posts";
    return axiosClient.get(url);
  },
  getPost(id) {
    const url = `posts/${id}`;
    return axiosClient.get(url);
  },
  getCommentOfPost(id) {
    const url = `posts/${id}/comments`;
    return axiosClient.get(url);
  }
};

export default testApi;
