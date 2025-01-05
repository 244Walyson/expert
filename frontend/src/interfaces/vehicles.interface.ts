import type { Brand } from './brand.interface'

export enum CategoryEnum {
  CAR = 'Car',
  MOTORCYCLE = 'Motorcycle',
  BIKE = 'Bike',
}

export interface Vehicle {
  id: number
  name: string
  category: CategoryEnum
  imgUrl: string
  brand: Brand
}
