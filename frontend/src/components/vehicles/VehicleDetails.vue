<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-10">
    <h1 class="text-3xl md:text-5xl font-bold mb-6">Detalhes do Veículo</h1>

    <div class="bg-white shadow-lg rounded-lg w-4/5 md:w-[600px] p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ vehicle.name }}</h2>

      <img
        class="h-80 w-full rounded-lg object-cover"
        :src="`https://images.unsplash.com/photo-1735399554370-4f9eab0cfc4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8`"
        :alt="vehicle.name"
      />

      <ul class="divide-y divide-gray-200">
        <li class="py-3 flex justify-between items-center">
          <span class="text-gray-600 font-medium">Placa:</span>
          <span class="text-gray-800 font-bold">{{ vehicle.plate }}</span>
        </li>
        <li class="py-3 flex justify-between items-center">
          <span class="text-gray-600 font-medium">Categoria:</span>
          <span class="text-gray-800 font-bold">{{ vehicle.category }}</span>
        </li>
        <li class="py-3 flex justify-between items-center">
          <span class="text-gray-600 font-medium">Marca:</span>
          <span class="text-gray-800 font-bold">{{ vehicle.brand.name }}</span>
        </li>
      </ul>

      <div class="flex justify-between items-end">
        <RouterLink
          to="/vehicles"
          class="mt-6 inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          Voltar para a lista de veículos
        </RouterLink>
        <div class="flex gap-5">
          <RouterLink
            :to="`/vehicles/edit/${vehicle.id}`"
            class="flex border border-gray-500 rounded-md px-5 items-center justify-center hover:bg-gray-50"
            >Editar</RouterLink
          >
          <DeleteDialog :vehicleId="vehicle.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { DeleteDialog } from '@/components/vehicles'
import { getVehicleById } from '@/services/vehicles.service.ts'

const router = useRoute()
const vehicle = reactive({
  id: '',
  name: '',
  plate: '',
  category: '',
  brand: {
    id: 0,
    name: '',
  },
})

onMounted(() => {
  const vehicleId = router.params.id
  getVehicleById(vehicleId).then((response) => {
    console.log(response)
    Object.assign(vehicle, response)
  })
})
</script>
