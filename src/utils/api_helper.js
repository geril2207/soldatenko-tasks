import axios from 'axios'

export const API_URL = 'http://localhost:8000/api'
export const STORAGE_URL = 'http://localhost:8000/api/private/'
export const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

axiosApi.interceptors.response.use(
  (config) => {
    return config
  },

  async (error) => {
    if (error.response.status === 403 && !error.response.data.success) {
      localStorage.removeItem('token')
      return (window.location.href = '/login')
    }
    throw error.response
    // return Promise.reject(error.response)
  }
)
