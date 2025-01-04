import AddVehicleView from '@/views/AddVehicleView.vue'
import HomeView from '@/views/HomeView.vue'
import VehiclesView from '@/views/VehiclesView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: VehiclesView,
    },
    {
      path: '/vehicles/add',
      name: 'AddVehicle',
      component: AddVehicleView,
    },
  ],
})

export default router
