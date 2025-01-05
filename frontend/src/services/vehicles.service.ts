import type { Vehicle } from '@/interfaces/vehicles.interface'
import axiosIntance from './interceptors'

export const createVehicle = async (data: Vehicle) => {
  try {
    const response = await axiosIntance.post(`/vehicles`, data)
    return response.data
  } catch (error) {
    console.error('Error creating vehicle:', error)
    throw new Error('Error creating vehicle. Try again later.')
  }
}

export const getVehicles = async ({
  query = '',
  page = 1,
  limit = 10,
}: {
  query?: string
  page?: number
  limit?: number
}): Promise<Vehicle[]> => {
  try {
    const response = await axiosIntance.get(`/vehicles?query=${query}&page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('Error creating vehicle:', error)
    throw new Error('Error creating vehicle. Try again later.')
  }
}

export const getVehicleById = async (id: number) => {
  try {
    const response = await axiosIntance.get(`/vehicles/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting vehicle:', error)
    throw new Error('Error getting vehicle. Try again later.')
  }
}

export const updateVehicle = async (id: number, data: Vehicle) => {
  try {
    const response = await axiosIntance.put(`/vehicles/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating vehicle:', error)
    throw new Error('Error updating vehicle. Try again later.')
  }
}

export const deleteVehicle = async (id: number) => {
  try {
    const response = await axiosIntance.delete(`/vehicles/${id}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    throw new Error('Error deleting vehicle. Try again later.')
  }
}
