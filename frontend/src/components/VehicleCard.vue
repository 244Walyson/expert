<template>
  <div class="flex flex-col bg-gray-100 h-72 w-[500px] p-10 pt-4 rounded-xl">
    <div class="w-full mb-4">
      <div class="flex items-center gap-2">
        <h1 class="text-xl text-gray-500 font-bold">{{ props.vehicle.brand.name }}</h1>
        <span class="text-3xl">-</span>
        <h1 class="text-3xl font-bold">{{ props.vehicle.name }}</h1>
      </div>
    </div>

    <div class="flex">
      <div class="w-1/2 flex flex-col justify-between">
        <div>
          <p class="text-xl">{{ props.vehicle.plate }}</p>
        </div>
        <div>
          <span class="text-2xl">{{ props.vehicle.category }}</span>
        </div>
      </div>
      <div class="h-auto w-full flex items-end">
        <img class="ml-auto mr-0 h-40 rounded-lg" :src="vehicleImage" :alt="vehicle.name" />
      </div>
    </div>
    <div class="flex justify-end">
      <button class="bg-red-500 p-1 text-white mt-4 rounded">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import vehicleImage from '../assets/trucks.png'
import { defineProps } from 'vue'

// Definindo a tipagem da propriedade "vehicle"
const props = defineProps<{
  vehicle: {
    id: string
    name: string
    plate: string
    category: string
    brand: {
      id: number
      name: string
    }
  }
}>()
</script>
