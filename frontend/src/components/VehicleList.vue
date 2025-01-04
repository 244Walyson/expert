<template>
  <div class="flex flex-col items-center">
    <h1 class="text-5xl py-10">Listing Vehicles</h1>

    <div class="flex flex-wrap gap-4 justify-center">
      <VehicleCard v-for="vehicle in state.vehicles" :key="vehicle.id" :vehicle="vehicle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VehicleCard from './VehicleCard.vue'
import axios from 'axios'
import { onMounted, reactive } from 'vue'

const state = reactive({
  vehicles: [],
})

onMounted(() => {
  axios
    .get('http://localhost:3000/vehicles')
    .then((response) => {
      state.vehicles = response.data.data
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
