import axiosIntance from './interceptors'

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axiosIntance.post(`/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Error uploading image. Try again later.')
  }
}
