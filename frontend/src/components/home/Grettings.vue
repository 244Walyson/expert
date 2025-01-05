<template>
  <div
    class="flex flex-col-reverse lg:flex-row items-center justify-between h-auto lg:h-[80vh] px-4 lg:px-12"
  >
    <div class="w-full lg:w-1/2 text-center lg:text-left">
      <h1 class="text-4xl lg:text-6xl font-bold lg:ml-10">
        Encontre e Liste uma Variadade de Veículos
      </h1>
      <p class="text-md lg:text-xl lg:ml-10 mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo ipsam hic dicta
        praesentium nam ducimus sapiente totam dignissimos voluptate, quasi quaerat sunt adipisci
        ratione molestias a officia enim iure.
      </p>
      <div class="flex justify-center lg:justify-start gap-4 mt-5 ml-10">
        <RouterLink
          to="/vehicles/add"
          class="flex text-md lg:text-lg h-10 items-center rounded border border-blue-950 px-6 lg:px-10 hover:bg-gray-50 justify-center"
        >
          Adicionar Veículo
        </RouterLink>
        <RouterLink
          to="/vehicles"
          class="flex text-md lg:text-lg text-white h-10 items-center rounded bg-blue-950 px-6 lg:px-10 hover:bg-blue-900 justify-center"
        >
          Ver Todos
        </RouterLink>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex justify-center lg:justify-end md:-mr-14 mt-6 lg:mt-0">
      <img class="h-auto w-3/4 lg:w-full" :src="GreetImage" alt="Veículos" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import GreetImage from '@/assets/trucks.png'
import { RouterLink } from 'vue-router'
</script>
