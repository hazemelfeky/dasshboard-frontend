<script setup>
const tab = ref('0')

const menusList = [
  {
    name: 'File',
    children: [
      { name: 'File1' },
      { name: 'File2' },
      { name: 'File3' },
    ]
  },
  {
    name: 'Monitor',
    children: [
      { name: 'Monitor 1' },
      { name: 'Monitor 2' },
      { name: 'Monitor 3' },
    ]
  },
  {
    name: 'Help ',
    children: [
      { name: 'Help 1' },
      { name: 'Help 2' },
      { name: 'Help 3' },
    ]
  },
]

const tableData = [
  {
    image: 'image1',
    pid: 'pid1',
    description: 'description1',
    status: 'status1',
    thread: 'thread1',
    cpu: 'cpu1',
    avrage: 'avrage1',
  },
  {
    image: 'image2',
    pid: 'pid2',
    description: 'description2',
    status: 'status2',
    thread: 'thread2',
    cpu: 'cpu2',
    avrage: 'avrage2',
  },
  {
    image: 'image3',
    pid: 'pid3',
    description: 'description3',
    status: 'status3',
    thread: 'thread3',
    cpu: 'cpu3',
    avrage: 'avrage3',
  },
  {
    image: 'image4',
    pid: 'pid4',
    description: 'description4',
    status: 'status4',
    thread: 'thread4',
    cpu: 'cpu4',
    avrage: 'avrage4',
  },
  {
    image: 'image1',
    pid: 'pid1',
    description: 'description1',
    status: 'status1',
    thread: 'thread1',
    cpu: 'cpu1',
    avrage: 'avrage1',
  },
  {
    image: 'image2',
    pid: 'pid2',
    description: 'description2',
    status: 'status2',
    thread: 'thread2',
    cpu: 'cpu2',
    avrage: 'avrage2',
  },
  {
    image: 'image3',
    pid: 'pid3',
    description: 'description3',
    status: 'status3',
    thread: 'thread3',
    cpu: 'cpu3',
    avrage: 'avrage3',
  },
  {
    image: 'image4',
    pid: 'pid4',
    description: 'description4',
    status: 'status4',
    thread: 'thread4',
    cpu: 'cpu4',
    avrage: 'avrage4',
  },
  {
    image: 'image1',
    pid: 'pid1',
    description: 'description1',
    status: 'status1',
    thread: 'thread1',
    cpu: 'cpu1',
    avrage: 'avrage1',
  },
  {
    image: 'image2',
    pid: 'pid2',
    description: 'description2',
    status: 'status2',
    thread: 'thread2',
    cpu: 'cpu2',
    avrage: 'avrage2',
  },
  {
    image: 'image3',
    pid: 'pid3',
    description: 'description3',
    status: 'status3',
    thread: 'thread3',
    cpu: 'cpu3',
    avrage: 'avrage3',
  },
  {
    image: 'image4',
    pid: 'pid4',
    description: 'description4',
    status: 'status4',
    thread: 'thread4',
    cpu: 'cpu4',
    avrage: 'avrage4',
  },
  {
    image: 'image1',
    pid: 'pid1',
    description: 'description1',
    status: 'status1',
    thread: 'thread1',
    cpu: 'cpu1',
    avrage: 'avrage1',
  },
  {
    image: 'image2',
    pid: 'pid2',
    description: 'description2',
    status: 'status2',
    thread: 'thread2',
    cpu: 'cpu2',
    avrage: 'avrage2',
  },
  {
    image: 'image3',
    pid: 'pid3',
    description: 'description3',
    status: 'status3',
    thread: 'thread3',
    cpu: 'cpu3',
    avrage: 'avrage3',
  },
  {
    image: 'image4',
    pid: 'pid4',
    description: 'description4',
    status: 'status4',
    thread: 'thread4',
    cpu: 'cpu4',
    avrage: 'avrage4',
  },
]

const props = defineProps(['isMobile'])

const x = ref(5)
</script>

<template>
  <div class="dashboard">
      
    <!-- menu bar -->
    <div class="menu--bar" :class="{ 'pa-0': isMobile }">
      <ul>
        <li v-for="item in menusList" :key="item.name">
          <v-btn class="menu--bar--btn">
            {{ item.name }}
            <v-menu activator="parent">
              <v-list>
                <v-list-item
                  v-for="child in item.children"
                  :key="child.name"
                  :value="child.name"
                >
                  <v-list-item-title>{{ child.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </li>
      </ul>
    </div>

    <!-- tabs -->
    <v-card>
      <v-tabs
        v-model="tab"
        :class="{ 'pa-0': isMobile }"
      >
        <v-tab :value="1">Overview</v-tab>
        <v-tab :value="2">CPU</v-tab>
        <v-tab :value="3">Memory</v-tab>
        <v-tab :value="4">Network</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="1" class="overview">
          <!-- Overview -->
          <div class="d-flex">
            <v-table :class="{ 'pa-0': isMobile }">
              <thead>
                <tr>
                  <th class="text-left">Image</th>
                  <th class="text-left">PID</th>
                  <th class="text-left">Description</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Threads</th>
                  <th class="text-left">CPU</th>
                  <th class="text-left">Avrage</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in tableData"
                  :key="item.image"
                >
                  <td>{{ item.image }}</td>
                  <td>{{ item.pid }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.thread }}</td>
                  <td>{{ item.cpu }}</td>
                  <td>{{ item.avrage }}</td>
                </tr>
              </tbody>
            </v-table>
            <div>
              <h2>Chart.js</h2>
              <button @click="x++">click</button>
              <bar-chart :chart-data="[x,72,50]" />
            </div>
          </div>
        </v-window-item>
        <v-window-item :value="2">
          CPU
        </v-window-item>
        <v-window-item :value="3">
          Memory
        </v-window-item>
        <v-window-item :value="4">
          Network
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>