<template>
  <div class="docker-page">
    <div class="navigator">
      <div class="container">
        <div class="head">
          <p>Containers</p>
        </div>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="i in 3"
            :key="i"
            title="Item"
            text="Lorem consequat."
          ></v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="images">
        <div class="head">
          <p>Images</p>
          <v-btn>➕</v-btn>
        </div>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="i in 4"
            :key="i"
            title="Item"
            text="Lorem consequat."
          ></v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <div class="content">
      <!-- <terminal-thread :tab="{ id: 1, value: 1 }" /> -->
      <p>terminal here</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.docker-page {
  display: flex;
  width: 100%;
  height: 100%;

  .navigator {
    display: flex;
    flex-direction: column;
    flex: 0 0 30%;
    border-right: 1px solid #ddd;
    padding-left: 1rem;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
      text-transform: uppercase;
      button {
        height: auto;
        min-width: auto;
        padding: 0.3rem 0.1rem;
        background-color: inherit;
        box-shadow: none;
      }
    }

    .v-expansion-panel {
      background-color: inherit;
      .v-expansion-panel__shadow {
        box-shadow: none;
      }
      .v-expansion-panel-title {
        min-height: auto;
        background-color: none;
        padding: 0.5rem;
      }
      .v-expansion-panel-text__wrapper {
        padding: 0.5rem;
      }
    }
    .container {
      flex-grow: 1;
      border-bottom: 1px solid #ddd;
    }
    .images {
      flex-grow: 1;
    }
  }

  .content {
  }
}
</style>
