<template>
  <div class="w-1/2 mx-auto">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col items-center">
        <h1 class="text-5xl py-10">Add Vehicle</h1>

        <div class="flex flex-col gap-4 w-[450px]">
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

          <Select class="p-2 border border-gray-300 rounded">
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

          <BrandSelectPopover :onBrandSelect="onBrandSelect" />

          <ImageDropzone />

          <Textarea placeholder="Descreva esse veiculo" />

          <Button type="submit" class="bg-blue-950 hover:bg-blue-900 text-white p-2 rounded mt-4"
            >Add Vehicle</Button
          >
        </div>
        <Toaster />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
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
import { BrandSelectPopover, ImageDropzone } from '@/components/add-vehicle'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

const { toast } = useToast()

const data = reactive({
  vehicle: {
    name: '',
    plate: '',
    category: '',
    brand: {
      name: '',
    },
  },
  brandSelectValue: '',
})

const onBrandSelect = (brand) => {
  data.vehicle.brand = brand
}

const handleSubmit = () => {
  console.log(data.vehicle)
}
</script>
