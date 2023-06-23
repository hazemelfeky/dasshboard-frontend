<template>
  <div class="docker-page">
    <div class="navigator">
      <div class="container">
        <div class="head">
          <p>Containers</p>
          <v-dialog class="docker-dialog" v-model="dialogContainer" width="60%">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">➕</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Container Data</span>
              </v-card-title>
              <v-card-text>
                <v-text-field label="image" v-model="image"></v-text-field>
                <!-- prefix="--name " -->
                <v-text-field
                  label="options"
                  v-model="options"
                ></v-text-field>
                <v-text-field label="tag" v-model="tag"></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  :loading="loadingBtn"
                  color="primary"
                  block
                  @click="handleCreateContainer"
                >
                  Create container
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="cont in containers"
            :key="cont.ID"
            :title="cont.Names"
          >
            <v-expansion-panel-text>
              <div class="d-flex flex-center">
                <div>
                  <p>Image: {{ cont.Image }}</p>
                  <p>CreatedAt: {{ cont.CreatedAt }}</p>
                  <p>
                    Status: {{ isContainerRunning(cont.Status) ? "▶" : "" }}
                    {{ cont.Status }}
                  </p>
                </div>
                <v-btn
                  variant="outlined"
                  :loading="loadingBtn"
                  v-if="!isContainerRunning(cont.Status)"
                  @click="handleStartContainer(cont.ID)"
                  >Start</v-btn
                >
                <v-btn
                  variant="outlined"
                  :loading="loadingBtn"
                  v-else
                  @click="handleStopContainer(cont.ID)"
                  >Stop</v-btn
                >
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="images">
        <div class="head">
          <p>Images</p>
          <v-dialog class="docker-dialog" v-model="dialogImages" width="60%">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">➕</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">Image Data</span>
              </v-card-title>
              <v-card-text>
                <v-text-field label="image" v-model="image"></v-text-field>
                <!-- prefix="--name " -->
                <v-text-field
                  label="options"
                  v-model="options"
                ></v-text-field>
                <v-text-field label="tag" v-model="tag"></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="primary"
                  block
                  :loading="loadingBtn"
                  @click="handlePullImage"
                >
                  Pull Image
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="img in images"
            :key="img.ImageID"
            :title="img.Repository"
          >
            <v-expansion-panel-text>
              <p>Tag: {{ img.Tag }}</p>
              <p>Size: {{ img.Size }}</p>
              <p>ImageID: {{ img.ImageID }}</p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <!-- <div class="content">
      <p>terminal here</p>
    </div> -->
  </div>
</template>

<script setup>
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const dialogContainer = ref(false);
const dialogImages = ref(false);
const loadingBtn = ref(false);
const image = ref(null);
const options = ref(null);
const tag = ref(null);
const store = useStore();
const getContainers = store.getContainers;
const getImages = store.getImages;
const createContainer = store.createContainer;
const startContainer = store.startContainer;
const stopContainer = store.stopContainer;
const pullImage = store.pullImage;
const { images, containers } = storeToRefs(store);

onMounted(async () => {
  await getContainers();
  await getImages();
});

const handleCreateContainer = async () => {
  const payload = {
    image: image.value,
    options: options.value,
    tag: tag.value,
  };
  loadingBtn.value = true;
  try {
    await createContainer(payload);
    await getContainers();
  } catch (e) {
    console.log("error form backend 😀");
  }
  image.value = null;
  options.value = null;
  tag.value = null;
  loadingBtn.value = false;
  dialogContainer.value = false;
};

const isContainerRunning = (status) => {
  return status.includes("Up");
};

const handleStartContainer = async (id) => {
  loadingBtn.value = true;
  await startContainer(id);
  await getContainers();
  loadingBtn.value = true;
};

const handleStopContainer = async (id) => {
  await stopContainer(id);
};
const handlePullImage = async () => {
  const payload = {
    image: image.value,
    options: options.value,
    tag: tag.value,
  };
  loadingBtn.value = true;
  try {
    await pullImage(payload);
    await getImages();
  } catch (e) {
    console.log("error form backend 😀");
  }
  image.value = null;
  options.value = null;
  tag.value = null;
  loadingBtn.value = false;
  dialogImages.value = false;
};
</script>

<style lang="scss">
.docker-page {
  display: flex;
  width: 100%;
  height: 100%;

  .navigator {
    display: flex;
    flex-direction: column;
    // flex: 0 0 30%;
    // max-width: 30%;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
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

      .flex-center {
        justify-content: space-between;
        align-items: center;
      }
      .v-expansion-panel__shadow {
        box-shadow: none;
      }
      .v-expansion-panel-title {
        min-height: auto;
        background-color: none;
        padding: 0.3rem 0.5rem;
        font-size: 14px;
      }
      .v-expansion-panel-text__wrapper {
        background-color: #eee;
        padding: 0.3rem 0.5rem;
        font-size: 13px;
        color: #888;
      }
    }

    .container {
      flex-grow: 1;
      border-bottom: 1px solid #ddd;
    }
    .images {
      border-top: 2px solid #bbb;
      flex-grow: 1;
    }
  }
}
.docker-dialog .v-card--variant-elevated,
.docker-dialog .v-card--variant-flat {
  background-color: #fff !important;
}
</style>
