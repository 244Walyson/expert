import type { Brand } from './brand.interface'

export enum CategoryEnum {
  CARRO = 'Carro',
  MOTOCICLETA = 'Motocicleta',
  CAMINHAO = 'Caminhão',
}

export interface Vehicle {
  id: number
  name: string
  category: CategoryEnum
  imgUrl: string
  brand: Brand
}
