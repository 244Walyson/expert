import axiosIntance from './interceptors'
import type { Brand } from '@/interfaces/brand.interface'

export const createBrand = async (data: Brand) => {
  try {
    const response = await axiosIntance.post(`/brands`, data)
    return response.data
  } catch (error) {
    console.error('Error creating brand:', error)
    throw new Error('Error creating brand. Try again later.')
  }
}

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await axiosIntance.get(`/brands`)
    return response.data
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw new Error('Error fetching brands. Try again.')
  }
}
