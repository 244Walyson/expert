<template>
  <div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <div class="flex items-center gap-4 hover:cursor-pointer" @click="() => clearBrand()">
          <Button
            variant="outline"
            :aria-expanded="open"
            type="button"
            class="w-full justify-between"
            :disabled="data.brand.id"
          >
            {{ data.brand.name ? data.brand.name : 'Selecione uma marca...' }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
          <Pencil />
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-full p-0">
        <Command class="w-[450px]">
          <CommandInput class="h-9" placeholder="Busque uma marca..." />
          <CommandEmpty>
            <AddBrandDialog
              triggertext="Nenhuma marca encontrada. Cadastrar nova?"
              :onBrandCreated="selectBrand"
            />
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="brand in data.brands"
                :key="brand.id"
                :value="brand.name ?? ''"
                @click="() => selectBrand(brand)"
              >
                {{ brand.name }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <Toaster />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, defineProps } from 'vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Pencil } from 'lucide-vue-next'
import { AddBrandDialog } from '@/components/vehicles'
import { getBrands } from '@/services/brands.service'
import type { Brand } from '@/interfaces/brand.interface'

const props = defineProps<{
  onBrandSelect: (brand: Brand) => void
  selectedBrand: Brand
}>()

const data = reactive({
  brand: {} as Brand,
  brands: [] as Brand[],
})

const open = ref(false)

const selectBrand = (brand: Brand) => {
  props.onBrandSelect(brand)
  data.brand = brand
  open.value = false
}

const clearBrand = () => {
  Object.assign(data.brand, {})
}

onMounted(() => {
  if (props.selectedBrand) {
    Object.assign(data.brand, props.selectedBrand)
  }

  getBrands()
    .then((response) => {
      Object.assign(data.brands, response)
      console.log(data.brands)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
