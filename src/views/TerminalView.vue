<template>
  <div class="terminal-page">
    <div class="container">
      <v-tooltip text="Kill all">
        <template v-slot:activator="{ props }">
          <button class="close--btn" v-bind="props"></button>
        </template>
      </v-tooltip>
      <v-card>
        <v-tabs v-model="cuurentTab" center-active>
          <v-tab v-for="tab in tabs" :key="tab.id" :value="tab.value">
            <p>{{ tab.name }}</p>
            <button
              v-if="tabs.length > 1"
              class="close--btn"
              @click="closeTab(tab.id)"
            ></button>
          </v-tab>
          <button class="add--tab" @click="addTab">+</button>
        </v-tabs>

        <v-card-text id="terminal-view">
          <v-window v-model="cuurentTab">
            <terminal-thread v-for="tab in tabs" :key="tab.id" :tab="tab" />
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useTerminalStore } from '@/store'
import { storeToRefs } from 'pinia'

const cuurentTab = ref(0);
// access the `store` variable anywhere in the component ✨
const store = useTerminalStore()
const { tabs } = storeToRefs(store)

const addTab = store.addTab
const closeTab = store.closeTab

// fix bug → when closeTab, tab = undefined
let tempTab = 0;
watch(cuurentTab, (newVal) => {
  if (newVal) tempTab = newVal;
  cuurentTab.value = newVal == undefined ? tempTab : newVal;
});
</script>
