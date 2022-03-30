import { API_URL, axiosApi } from '../utils/api_helper'

export const UserService = {
  getUserInfo() {
    return axiosApi.get(`${API_URL}/user/info`)
  },
  addUser(user) {
    return axiosApi.post(`${API_URL}/user/signup`, user)
  },
  login(user) {
    return axiosApi.post(`${API_URL}/user/login`, user)
  },
}
