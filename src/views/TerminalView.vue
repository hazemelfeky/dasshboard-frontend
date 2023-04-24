<template>
  <div class="terminal">
    <div class="container">
      <v-tooltip text="Kill all">
        <template v-slot:activator="{ props }">
          <button class="close--btn" v-bind="props"></button>
        </template>
      </v-tooltip>
      <v-card>
        <v-tabs v-model="tab" center-active>
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
          <v-window v-model="tab">
            <terminal-thread v-for="tab in tabs" :key="tab.id" :tab="tab" @clickEnter="handleEnter" />
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
let id = 0;
const tab = ref(0);

const tabs = ref([
  {
    id,
    value: 0,
    name: 0,
    threads: [
      { address: "hazem ", instruction: "instruction", message: "message" },
    ],
    currentThread: { address: "hazem " },
    // TODO: add → ended: true to current, to simulate if it's run something like yarn dev
    // so no go directly to next instuction
  },
]);

const handleEnter = async (instruction, tab) => {
  
  const message = "message".repeat(tab.threads.length) // TODO: message
  tab.threads.push({ ...tab.currentThread, instruction, message })
  tab.currentThread = { address: "hazem " }

  setTimeout( () => {
    const terminalView = document.getElementById('terminal-view')
    terminalView.scrollTop = terminalView.scrollHeight + 200
  })
}

const addTab = () => {
  id++;
  tabs.value.push({
    id,
    value: id,
    name: id,
    threads: [],
    currentThread: { address: "hazem " },
  });
};

const closeTab = (id) => {
  tabs.value = tabs.value.filter((el) => el.id != id);
};

// fix bug → when closeTab, tab = undefined
let currentTab = 0;
watch(tab, (newVal) => {
  if (newVal) currentTab = tab.value;
  tab.value = newVal == undefined ? currentTab : newVal;
});
</script>
