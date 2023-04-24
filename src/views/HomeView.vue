<script setup>
const drawer = ref(null)

const items = [
  {
    title: 'Dashboard',
    value: 'dashboard',
    to: '/dashboard',
    icon: '🎫'
  },
  {
    title: 'File explorer',
    value: 'explorer',
    to: '/explorer',
    icon: '🌎'
  },
  {
    title: 'Terminal',
    value: 'terminal',
    to: '/terminal',
    icon: '📟'
  },
]

const isMobile = computed( () => windowWidth.value < 768 )

const windowWidth = ref(0)

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
}
onMounted( () => {
  updateWidth()
  window.addEventListener('resize', updateWidth);
})
</script>

<template>
  <div v-if="isMobile" @click.stop="drawer = !drawer">
    📃
  </div>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    :permanent="!isMobile"
  >
    <div class="d-flex flex-column h-full">
      <div>
        <h2>logo here</h2>
        <!-- <h2>Window width: {{ window.innerWidth }}</h2> -->
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" :to="item.to" :ripple="false">
            <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon> -->
            <v-list-item-title>{{ item.icon }}  {{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <div>
        <h2>hey</h2>
      </div>
    </div>
  </v-navigation-drawer>
  <div class="padding--nav" :class="{ 'pa-0': isMobile }">
    <router-view :isMobile="isMobile">
    </router-view>
  </div>

</template>
