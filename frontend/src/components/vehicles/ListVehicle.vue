<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl md:text-5xl py-10 font-bold">Listando Veículos</h1>

    <div
      class="flex items-center border-b px-3 w-4/5 md:w-[600px] rounded-lg border border-gray-300"
    >
      <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <Input
        :value="data.queryParams.query"
        @input="handleSearchInputChange($event.target.value)"
        placeholder="Pesquise por um veículo, marca ou placa"
        class="'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',"
      />
    </div>

    <div class="flex flex-wrap gap-4 justify-center">
      <VehicleCard v-for="vehicle in data.vehicles.data" :key="vehicle.id" :vehicle="vehicle" />
    </div>
  </div>

  <div class="flex justify-center py-6 pb-32">
    <Pagination
      v-slot="{ page }"
      :total="data.vehicles.total"
      :sibling-count="1"
      show-edges
      :default-page="1"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="handlePageChange(1)" />
        <PaginationPrev @click="handlePageChange(data.queryParams.page - 1)" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            @click="handlePageChange(item.value)"
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="handlePageChange(data.queryParams.page + 1)" />
        <PaginationLast @click="handlePageChange(data.vehicles.pages)" />
      </PaginationList>
    </Pagination>
  </div>
</template>

<script lang="ts" setup>
import VehicleCard from './VehicleCard.vue'
import { onMounted, reactive, watch } from 'vue'
import { getVehicles } from '@/services/vehicles.service.ts'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { Search } from 'lucide-vue-next'
import { debounce } from 'lodash'
import { Vehicle } from '@/interfaces/vehicle'

const data = reactive({
  vehicles: {
    data: [] as Vehicle[],
    pages: 1,
    page: 1,
    limit: 9,
    total: 0,
  },
  loading: true,
  queryParams: {
    query: '',
    page: 1,
    limit: 9,
  },
})

const handlePageChange = (page: number) => {
  data.queryParams.page = page
  fetchVehicles(page)
}

const handleSearchInputChange = (query: string) => {
  data.queryParams.query = query
  data.queryParams.page = 1
  console.log(data.queryParams)
}

const fetchVehicles = () => {
  console.log(data.queryParams)
  getVehicles(data.queryParams)
    .then((response) => {
      console.log(response)
      data.vehicles = response
      data.loading = false
    })
    .catch((error) => {
      data.loading = false
      console.log(error)
    })
}

const debouncedFetchVehicles = debounce(() => {
  data.queryParams.page = 1
  console.log('debounced', data.queryParams)
  fetchVehicles()
}, 500)

watch(
  () => data.queryParams.query,
  (newValue) => {
    console.log('Query alterada:', newValue)
    debouncedFetchVehicles()
  },
)

onMounted(() => {
  fetchVehicles()
})
</script>
