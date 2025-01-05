import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
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

    return Promise.reject(new Error(error.message))
  },
)

export default axiosInstance
