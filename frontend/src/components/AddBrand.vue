<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col items-center">
        <h1 class="text-5xl py-10">Add Vehicle</h1>

        <div class="flex flex-col gap-4">
          <input
            v-model="form.brand.name"
            type="text"
            placeholder="Name"
            class="p-2 border border-gray-300 rounded"
          />

          <button type="submit" class="bg-blue-500 text-white p-2 rounded mt-4">Add Vehicle</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  brand: {
    name: '',
  },
})
</script>
