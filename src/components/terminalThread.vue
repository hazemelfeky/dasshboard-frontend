<template>
  <v-window-item :value="tab.value">
    <div v-if="tab.threads.length > 0" class="threads" v-for="thread in tab.threads">
      <p>{{ thread.address }} > {{ thread.instruction }}</p>
      <p>{{ thread.message }}</p>
    </div>
    <div class="current-thread">
      {{ tab.currentThread.address }} >
      <input v-model="instraction" @keydown.enter="handleEnter(instraction, tab)" />
    </div>
  </v-window-item>
</template>

<script setup>
defineProps({
  tab: Object
})

const emit = defineEmits()

const instraction = ref("")
const handleEnter = (instr, tab) => {
  emit('clickEnter', instr, tab)
  instraction.value = ""
}
</script>