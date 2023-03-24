<script setup>
const props = defineProps(['isMobile'])

const files = [
  { id: 1, name: "folder 1", type: "folder" },
  { id: 2, name: "folder 2", type: "folder" },
  { id: 3, name: "folder 3", type: "folder" },
  { id: 4, name: "folder 4", type: "folder" },
  { id: 5, name: "folder 5", type: "folder" },
  { id: 6, name: "folder 6", type: "folder" },
]

const handleFileClicked = (file) => {
  console.log(file.name);
}
</script>

<template>
  <div class="explorer" :class="{ 'pa-0': isMobile }">
    <div class="menu--bar" :class="{ 'pa-0': isMobile }">
      <v-btn class="">
        Up
      </v-btn>
      <v-btn class="">
        New
      </v-btn>
    </div>
    <div class="files--container">
      <div v-for="file in files" :key="file.id" class="file" @dblclick="handleFileClicked(file)">
        <img src="@/assets/folder.png" alt="icon" />
        <p>{{ file.name }}</p>
      </div>
    </div>
  </div>
</template>