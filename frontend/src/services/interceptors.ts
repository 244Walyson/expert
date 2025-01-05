import axios from 'axios'

console.log(import.meta.env.VITE_API_URL)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    console.error('Error on request:', error)
    return Promise.reject(new Error(error.message))
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          const response = await axios.post(`/auth/refresh-token`, {
            refresh_token: refreshToken,
          })

          const accessToken = response.data

          error.config.headers['Authorization'] = `Bearer ${accessToken.access_token}`

          return axios(error.config)
        } catch {
          return Promise.reject(new Error('Falha ao atualizar o token'))
        }
      }
      return Promise.reject(new Error('Usuário não autenticado'))
    }
    console.error('Error on response:', error)
    return Promise.reject(new Error(error.message))
  },
)

export default axiosInstance
