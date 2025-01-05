<template>
  <div class="flex flex-col w-4/5 sm:w-[500px] bg-white shadow-lg h-auto p-6 rounded-xl">
    <RouterLink :to="`/vehicles/${props.vehicle.id}`">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <div class="flex items-center gap-3">
          <h1 class="text-xl text-gray-700 font-bold">{{ props.vehicle.brand.name }}</h1>
          <span class="text-2xl font-light text-gray-500">-</span>
          <h1 class="text-2xl font-bold text-gray-800">{{ props.vehicle.name }}</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col">
            <label for="plate" class="text-sm text-gray-500 font-medium">Placa</label>
            <p id="plate" class="text-lg font-semibold text-gray-800">{{ props.vehicle.plate }}</p>
          </div>
          <div class="flex flex-col">
            <label for="category" class="text-sm text-gray-500 font-medium">Categoria</label>
            <p id="category" class="text-lg font-semibold text-gray-800">
              {{ props.vehicle.category }}
            </p>
          </div>
        </div>

        <div class="relative flex justify-center items-center">
          <img
            class="h-40 w-auto rounded-lg object-cover"
            :src="vehicleImage"
            :alt="props.vehicle.name"
          />
        </div>
      </div>
    </RouterLink>

    <div class="mt-6 flex justify-end gap-4">
      <RouterLink
        :to="`/vehicles/edit/${props.vehicle.id}`"
        class="border border-gray-500 px-4 flex items-center justify-center rounded-md hover:bg-gray-50"
        >Editar</RouterLink
      >
      <DeleteDialog :vehicleId="props.vehicle.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import vehicleImage from '@/assets/trucks.png'
import { RouterLink } from 'vue-router'
import { DeleteDialog } from '@/components/vehicles'
import { defineProps } from 'vue'

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
  onDelete: () => void
}>()
</script>
