<script setup>
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { loading } = storeToRefs(store);

const router = useRouter();
const drawer = ref(null);

const items = [
  {
    title: "Dashboard",
    value: "dashboard",
    to: "/dashboard",
    icon: "🎫",
  },
  {
    title: "File explorer",
    value: "explorer",
    to: "/explorer",
    icon: "🌎",
  },
  {
    title: "Terminal",
    value: "terminal",
    to: "/terminal",
    icon: "📟",
  },
  {
    title: "Docker",
    value: "docker",
    to: "/docker",
    icon: "📦",
  },
];

const isMobile = computed(() => windowWidth.value < 768);

const windowWidth = ref(0);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

const handleLogout = () => {
  localStorage.clear();
  router.push("/");
};
</script>

<template>
  <div v-if="isMobile" @click.stop="drawer = !drawer">📃</div>
  <v-navigation-drawer v-model="drawer" location="left" :permanent="!isMobile">
    <div class="d-flex flex-column h-full">
      <div>
        <h1 class="logo"><img src="../assets/logo.png" alt="word logo" /></h1>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            :ripple="false"
          >
            <v-list-item-title
              >{{ item.icon }} {{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </div>
      <div class="ma-8">
        <v-btn variant="plain" @click="handleLogout">🏃‍♂️ Logout</v-btn>
      </div>
    </div>
  </v-navigation-drawer>
  <div v-if="loading">
    <div class="loading">
      <h3>loading</h3>
    </div>
  </div>
  <div v-else class="padding--nav h-full" :class="{ 'pa-0': isMobile }">
    <router-view :isMobile="isMobile"> </router-view>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
