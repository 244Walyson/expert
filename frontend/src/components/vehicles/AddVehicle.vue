<template>
  <div class="w-1/2 mx-auto">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col items-center">
        <h1 class="text-2xl py-10 sm:text-4xl font-bold md:text-4xl">{{ data.title }}</h1>

        <div class="flex flex-col gap-4 w-[400px] sm:w-[450px]">
          <Input
            class="p-2 border border-gray-300 rounded placeholder:text-gray"
            v-model="data.vehicle.name"
            type="text"
            placeholder="Nome"
          />
          <Input
            class="p-2 border border-gray-300 rounded placeholder:text-gray"
            v-model="data.vehicle.plate"
            type="text"
            placeholder="Placa"
          />

          <Select v-model="data.vehicle.category" class="p-2 border border-gray-300 rounded">
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                <SelectItem value="CARRO"> Carro </SelectItem>
                <SelectItem value="MOTOCICLETA"> Motocicleta </SelectItem>
                <SelectItem value="CAMINHAO"> Caminhão </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div v-if="!isLoading" class="flex flex-col gap-4">
            <BrandSelectPopover
              :onBrandSelect="onBrandSelect"
              :selectedBrand="data.vehicle.brand"
            />
            <ImageDropzone :onImageUpload="onImageUpload" :imgUrl="data.vehicle.imgUrl" />
          </div>
          <Button type="submit" class="bg-blue-950 hover:bg-blue-900 text-white p-2 rounded mt-4"
            >Salvar</Button
          >
        </div>
        <Toaster />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BrandSelectPopover, ImageDropzone } from '@/components/vehicles'
import { Input } from '@/components/ui/input'
import { createVehicle, updateVehicle, getVehicleById } from '@/services/vehicles.service'
import type { Vehicle } from '@/interfaces/vehicles.interface'
import type { Brand } from '@/interfaces/brand.interface'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { toast } = useToast()
const isLoading = ref(false)

const data = reactive({
  vehicle: {} as Vehicle,
  title: 'Adicionar Veículo',
})

const onBrandSelect = (brand: Brand) => {
  Object.assign(data.vehicle.brand, brand)
  return brand
}

const onImageUpload = (url: string) => {
  data.vehicle.imgUrl = url
  console.log('onimage', data.vehicle.imgUrl)
}

const handleSubmit = () => {
  console.log(data.vehicle)
  const existsId = route.params.id
  if (existsId) {
    return editVehicle()
  }
  newVehicle()
}

const newVehicle = () => {
  isLoading.value = true
  createVehicle(data.vehicle)
    .then((response) => {
      toast({
        title: 'Veículo cadastrado com sucesso',
        description: 'O veículo foi cadastrado com sucesso.',
      })
      isLoading.value = false
      router.push({ name: 'vehiclesDetails', params: { id: response.id } })
    })
    .catch(() => {
      toast({
        title: 'Erro ao cadastrar veículo',
        description: 'Ocorreu um erro ao cadastrar o veículo.',
      })
      isLoading.value = false
    })
}

const editVehicle = () => {
  isLoading.value = true
  updateVehicle(data.vehicle.id, data.vehicle)
    .then(() => {
      toast({
        title: 'Veículo atualizado com sucesso',
        description: 'Os dados do veículo foram atualizados com sucesso.',
      })
      isLoading.value = false
      router.push({ name: 'vehiclesDetails', params: { id: data.vehicle.id } })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Erro ao atualizar veiculo',
        description: 'Ocorreu um erro ao atualizar o veículo.',
      })
      isLoading.value = false
    })
}

const fetchVehicle = () => {
  isLoading.value = true
  getVehicleById(+route.params.id)
    .then((response) => {
      console.log(response)
      Object.assign(data.vehicle, response)
      isLoading.value = false
    })
    .catch(() => {
      toast({
        title: 'Erro ao buscar veículo',
        description: 'Ocorreu um erro ao buscar o veículo.',
      })
      isLoading.value = false
    })
}

onMounted(() => {
  console.log(route.params)
  if (route.params.id) {
    data.title = 'Editar Veículo'
    fetchVehicle()
  }
})
</script>
