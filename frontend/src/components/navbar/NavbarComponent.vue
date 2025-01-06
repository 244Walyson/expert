<template>
  <nav class="bg-gray-800 border-b border-gray-500">
    <div class="mx-auto px-2 md:px-14">
      <div class="flex h-20 items-center w-full justify-between">
        <div class="flex flex-1 justify-between items-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-14 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">Vue Cars</span>
          </RouterLink>
          <div class="md:ml-auto flex items-center">
            <div class="space-x-2 hidden md:flex">
              <RouterLink
                v-for="links in navbarLinks"
                :key="links.id"
                :to="links.path"
                :class="[
                  isActiveLink(links.path)
                    ? 'bg-blue-950 text-white'
                    : 'hover:bg-blue-950 hover:text-white',
                  'text-background',
                  'px-3',
                  'py-2',
                  'rounded',
                  'text-center',
                ]"
                >{{ links.label }}</RouterLink
              >
            </div>
            <div class="md:hidden">
              <Sheet>
                <SheetTrigger as-child>
                  <Button variant="ghost"> <Menu class="text-white text-4xl" /></Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription> Para onde você deseja ir? </SheetDescription>
                  </SheetHeader>
                  <div class="flex flex-col gap-2 mt-10 pr-4 items-start">
                    <SheetClose
                      class="w-full flex justify-start"
                      v-for="links in navbarLinks"
                      :key="links.id"
                    >
                      <RouterLink
                        :to="links.path"
                        :class="[
                          isActiveLink('/')
                            ? 'bg-blue-950 text-white'
                            : 'hover:bg-gray-900 hover:text-white',
                          'text-foreground',
                          'px-3',
                          'py-2',
                          'rounded',
                          'w-full',
                          'text-left',
                        ]"
                        >{{ links.label }}</RouterLink
                      >
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-vue-next'
import { navbarLinks } from '@/static/navbar-links'

const isActiveLink = (routePath: string) => {
  const route = useRoute()
  return route.path === routePath
}
</script>
