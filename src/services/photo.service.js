import { QueryCache, useQueryClient } from 'react-query'
import { API_URL, axiosApi, STORAGE_URL } from '../utils/api_helper'

export const PhotoService = {
  async getPhotoImg(str) {
    const res = await axiosApi.get(`${STORAGE_URL}${str}`)
    const img = await res.blob()
    return img
  },
  getPhotos() {
    return axiosApi.get(`${API_URL}/photo`)
  },
  getPhotoById(id) {
    return axiosApi.get(`${API_URL}/photo/${id}`)
  },
  updatePhoto(data, id) {
    return axiosApi.post(`${API_URL}/photo/${id}`, data)
  },
  deletePhoto(id) {
    return axiosApi.delete(`${API_URL}/photo/${id}`)
  },
  uploadPhoto(photo) {
    return axiosApi.post(`${API_URL}/photo`, photo)
  },
  sharePhoto(id, photos) {
    return axiosApi.post(`${API_URL}/user/${id}/share`, { photos })
  },
}
