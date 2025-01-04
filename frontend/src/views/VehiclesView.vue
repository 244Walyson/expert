<template>
  <div>
    <VehiclesList />
  </div>
</template>

<script lang="ts" setup>
import VehiclesList from '../components/VehicleList.vue'

import { ref } from 'vue'

const vehicle = ref({
  id: '1',
  name: 'Truck 01',
  plate: 'ABC-1234',
  category: 'Truck',
  brand: {
    id: 1,
    name: 'Ford',
  },
})
</script>
