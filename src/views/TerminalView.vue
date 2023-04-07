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
            <button class="close--btn" @click="closeTab(tab.id)"></button>
          </v-tab>
          <button class="add--tab" @click="addTab">+</button>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item v-for="tab in tabs" :key="tab.id" :value="tab.value">
              {{ tab.content }}
              <input />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
let id = 0;
const tab = ref(0)

const tabs = ref([
  { id, value: 0, name: 0, content: "hazem " }
])

const addTab = () => {
  id++;
  tabs.value.push({ id, value: id, name: id, content: "hazem ".repeat(id+1) })
}

const closeTab = (id) => {
  tabs.value = tabs.value.filter(el => el.id != id)
  tab.value = tab.value
}
</script>
