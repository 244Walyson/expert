<template>
  <div class="flex items-center justify-between h-[80vh]">
    <div class="w-1/2">
      <h1 class="text-6xl font-bold ml-36">Encontre e Liste uma Variadade de Veiculos</h1>
      <p class="text-xl ml-36 mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo ipsam hic dicta
        praesentium nam ducimus sapiente totam dignissimos voluptate, quasi quaerat sunt adipisci
        ratione molestias a officia enim iure.
      </p>
      <div class="flex justify-center gap-4 mt-5">
        <RouterLink
          to="vehicles"
          class="flex text-lg text-white h-10 items-center rounded bg-blue-500 px-10"
          >Ver Todos</RouterLink
        >
        <RouterLink
          to="/vehicles/add"
          class="flex text-lg h-10 items-center rounded border border-blue-500 px-10"
          >Adicionar Veiculo</RouterLink
        >
        <Button>Ola</Button>
      </div>
    </div>
    <div class="ml">
      <img class="ml-auto mr-0 h-full w-full" :src="GreetImage" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import GreetImage from '../assets/trucks.png'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>
