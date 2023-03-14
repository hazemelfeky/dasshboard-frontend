<script setup>
import { ref } from "vue"

const drawer = ref(true)

const items = [
  {
    title: 'Dashboard',
    value: 'dashboard',
    to: '/dashboard'
  },
  {
    title: 'File explorer',
    value: 'explorer',
    to: '/explorer'
  },
  {
    title: 'Terminal',
    value: 'terminal',
    to: '/terminal'
  },
]
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    permanent
  >
    <div class="d-flex flex-column h-full">
      <div>
        <h2>logo here</h2>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" :to="item.to" :ripple="false">
            <v-list-item-icon>
              <!-- <v-icon>{{ item.icon }}</v-icon> -->
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <div>
        <h2>hey</h2>
      </div>
    </div>
  </v-navigation-drawer>
  <div class="padding--nav">
    <router-view>
    </router-view>
  </div>

</template>

<style scoped>

</style>