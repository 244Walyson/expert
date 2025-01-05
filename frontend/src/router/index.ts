import AddVehicleView from '@/views/AddVehicleView.vue'
import HomeView from '@/views/HomeView.vue'
import VehiclesView from '@/views/VehiclesView.vue'
import VehiclesDetails from '@/views/VehiclesDetails.vue'
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
      name: 'vehicles',
      component: VehiclesView,
    },
    {
      path: '/vehicles/add',
      name: 'addVehicle',
      component: AddVehicleView,
    },
    {
      path: '/vehicles/:id',
      name: 'vehiclesDetails',
      component: VehiclesDetails,
    },
    {
      path: '/vehicles/edit/:id',
      name: 'editVehicle',
      component: AddVehicleView,
    },
  ],
})

export default router
