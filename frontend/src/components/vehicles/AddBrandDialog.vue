<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="primary" class="hover:underline">
          {{ props.triggertext }}
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Adicionar Marca</DialogTitle>
          <DialogDescription>
            Adicione uma nova marca para o veiculo, clique em salvar para confirmar.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right"> Nome </Label>
            <Input id="name" class="col-span-3 rounded" v-model="data.brand.name" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button class="border border-blue-900 rounded text-blue-900" variant="outline"
              >Cancelar</Button
            >
          </DialogClose>
          <DialogClose>
            <Button
              class="bg-blue-950 hover:bg-blue-900 rounded text-white"
              variant=""
              type="submit"
              @click="handleCreateBrand"
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createBrand } from '@/services/brands.service'
const { toast } = useToast()

interface Brand {
  id: number
  name: string
}

const props = defineProps<{
  triggertext: string
  onBrandCreated: (brand: Brand) => void
}>()

const data = reactive({
  brand: {},
})

const handleCreateBrand = () => {
  createBrand(data.brand)
    .then((data) => {
      props.onBrandCreated(data)
      toast({
        title: 'Marca cadastrada com sucesso',
        description: 'A marca foi cadastrada com sucesso.',
      })
    })
    .catch((error) => {
      toast({
        title: 'Erro ao cadastrar marca',
        description: 'Ocorreu um erro ao cadastrar a marca.',
      })
      console.error(error)
    })
}
</script>
