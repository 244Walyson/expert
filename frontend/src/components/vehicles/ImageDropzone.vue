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
        v-if="!data.imgUrl"
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
      <div v-if="data.imgUrl" class="h-full w-full">
        <img :src="data.imgUrl" :alt="data.imgUrl" class="h-full w-full rounded object-cover" />
        <button @click="() => (data.imgUrl = '')" class="absolute top-0 right-0 p-1">
          <Trash class="text-white" />
        </button>
      </div>
      <Input @change="onFileChange" type="file" id="image" class="hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { reactive, ref, defineProps } from 'vue'
import { uploadImage } from '@/services/image.service.ts'
import { useToast } from '@/components/ui/toast/use-toast'
import { Trash } from 'lucide-vue-next'

const { toast } = useToast()

const isActive = ref(false)
const data = reactive({
  imgUrl: '',
})

defineProps<{
  onImageUpload: (url: string) => void
}>()

function onDrop(event: DragEvent) {
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    handleFileUpload(file)
  }
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input?.files?.[0]
  if (file) {
    handleFileUpload(file)
  }
}

function handleFileUpload(file: File) {
  uploadImage(file)
    .then((response) => {
      data.imgUrl = response.url
      onImageUpload(response.url)
      toast({
        title: 'Imagem enviada com sucesso',
        description: 'A imagem foi enviada com sucesso.',
      })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Erro ao fazer upload da imagem',
        description: 'Ocorreu um erro ao fazer upload da imagem.',
      })
    })
}

const toggleActive = () => {
  isActive.value = !isActive.value
}
</script>
