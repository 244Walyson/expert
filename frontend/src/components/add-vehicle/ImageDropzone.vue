<template>
  <div ref="dropZoneRef">
    <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="onDrop"
      className="flex rounded border-2 border-dashed relative h-24"
    >
      <Label
        for="image"
        :class="{
          'bg-blue-300': isActive,
          'flex flex-col rounded text-gray-500 justify-center items-center top-0 left-0 cursor-pointer text-base h-full w-full absolute transition-all duration-300': true,
        }"
      >
        <span>Arraste e solte a imagem aqui</span>
        <span>Ou</span>
        <span>Clique para selecionar uma imagem</span>
      </Label>
      <Input type="file" id="image" class="hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'

const imgUrl = ref<string | null>(null)
const isActive = ref(false)

function onDrop(event: DragEvent) {
  console.log(event.dataTransfer?.files)
}

const toggleActive = () => {
  isActive.value = !isActive.value
}
</script>
