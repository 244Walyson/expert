<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button
        class="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg shadow transition duration-300"
      >
        Excluir Veículo
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita. Você tem certeza de que deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete" class="bg-red-500 hover:bg-red-600"
          >Confirmar</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteVehicle } from '@/services/vehicles.service'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'

const { toast } = useToast()
const router = useRouter()

const props = defineProps<{
  vehicleId: number
}>()

const handleDelete = () => {
  deleteVehicle(+props.vehicleId)
    .then(() => {
      toast({
        title: 'Veiculo excluído com sucesso',
        description: 'O veículo foi excluído com sucesso.',
      })
      router.push({ name: 'vehicles' })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Erro ao excluir veículo',
        description: 'Ocorreu um erro ao excluir o veículo.',
      })
    })
}
</script>
