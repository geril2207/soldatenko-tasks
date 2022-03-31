import { API_URL, axiosApi } from '../utils/api_helper'

export const PhotoService = {
  getPhotos() {
    return axiosApi.get(`${API_URL}/photo`)
  },
  getPhotoById(id) {
    if (!id) return null
    return axiosApi.get(`${API_URL}/photo/${id}`)
  },
  updatePhoto(data, id) {
    console.log(data)
    return axiosApi.post(`${API_URL}/photo/${id}`, data)
  },
  deletePhoto(id) {
    return axiosApi.delete(`${API_URL}/photo/${id}`)
  },
  uploadPhoto(photo) {
    return axiosApi.post(`${API_URL}/photo`, photo)
  },
}
