<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col items-center">
        <h1 class="text-5xl py-10">Add Vehicle</h1>

        <div class="flex flex-col gap-4">
          <input
            v-model="form.vehicle.name"
            type="text"
            placeholder="Name"
            class="p-2 border border-gray-300 rounded"
          />
          <input
            v-model="form.vehicle.plate"
            type="text"
            placeholder="Plate"
            class="p-2 border border-gray-300 rounded"
          />
          <select
            v-model="form.vehicle.category"
            id="type"
            name="type"
            class="border rounded w-full py-2 px-3"
            required
          >
            <option value="CARRO">Carro</option>
            <option value="MOTOCICLETA">Motocicleta</option>
            <option value="CAMINHAO">caminhão</option>
          </select>
          <select
            v-model="form.vehicle.category"
            id="type"
            name="type"
            class="border rounded w-full py-2 px-3"
            required
          >
            <option v-for="brand in form.brands" :key="brand.id" :value="form.id">
              {{ brand.name }}
            </option>
          </select>
          <RouterLink
            to="/brand/add"
            class="text-sm ml-auto mr-0 -mt-3 text-gray-500 hover:underline"
            >Cannot find a brand? Add new</RouterLink
          >
        </div>

        <button type="submit" class="bg-blue-500 text-white p-2 rounded mt-4">Add Vehicle</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { RouterLink } from 'vue-router'
import { onMounted, reactive } from 'vue'

const form = reactive({
  vehicle: {
    name: '',
    plate: '',
    category: '',
    brand: {
      name: '',
    },
  },
  brands: [],
})

onMounted(() => {
  axios
    .get('http://localhost:3000/brands')
    .then((response) => {
      form.brands = response.data
      console.log(form.brands)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
