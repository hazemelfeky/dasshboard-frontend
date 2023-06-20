<script setup>
const props = defineProps(["isMobile"]);

const files = [
  { id: 1, name: "folder 1", type: "folder" },
  { id: 2, name: "folder 2", type: "folder" },
  { id: 3, name: "folder 3", type: "folder" },
  { id: 4, name: "folder 4", type: "folder" },
  { id: 5, name: "folder 5", type: "folder" },
  {
    id: 6,
    name: "image 1",
    type: "image",
    link: "https://picsum.photos/200/200",
  },
  {
    id: 7,
    name: "file 1",
    type: "file",
  },
];

const selected = ref({ id: null });
const imageInView = ref("");

function hasParentWithAttribute(element, parentCondition) {
  let parent = element.parentElement;
  while (parent !== null) {
    if (parentCondition(parent)) {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

const handleAllExplorerClicked = (event) => {
  const isClickedOnFileItself = event.target.classList.contains("file");
  const isClickedOnFileChild = hasParentWithAttribute(event.target, (el) =>
    el.classList.contains("file")
  );
  const isFileClicked = isClickedOnFileItself || isClickedOnFileChild;
  if (isFileClicked) {
    const id = isClickedOnFileItself
      ? event.target.getAttribute("file-id")
      : event.target.parentElement.getAttribute("file-id");
    const file = files.find((el) => el.id == id);
    handleFileClicked(file);
  } else {
    const clickedOnMenuBar =
      event.target.classList.contains("menu--bar") ||
      hasParentWithAttribute(event.target, (el) =>
        el.classList.contains("menu--bar")
      );
    if (clickedOnMenuBar) return;
    handleFileClicked({});
  }
};

onMounted(() => {
  document.addEventListener("click", handleAllExplorerClicked);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleAllExplorerClicked);
});

const handleFileClicked = (file) => {
  selected.value = file;
  if (Object.keys(file).length === 0) {
    selected.value.id = null;
  }
};

const openFolder = (folder) => {
  console.log("open folder");
};

const openImage = (imageFile) => {
  imageInView.value = imageFile.link;
};

const closeImage = () => {
  imageInView.value = "";
};

const openFile = (file) => {
  console.log("can't open file");
};

const handleFileDbclicked = (file) => {
  switch (file.type) {
    case "folder":
      openFolder(file);
      break;

    case "image":
      openImage(file);
      break;

    default:
      openFile(file);
      break;
  }
};

const handleCopy = () => {
  console.log("copy file ", selected.value.id);
};

const handleMove = () => {
  console.log("move file ", selected.value.id);
};

const handleDelete = () => {
  console.log("delete file ", selected.value.id);
};
</script>

<template>
  <div class="explorer" :class="{ 'pa-0': isMobile }">
    <div class="menu--bar" :class="{ 'pa-0': isMobile }">
      <div>
        <v-btn class=""> Up </v-btn>
        <v-btn class=""> New </v-btn>
      </div>
      <div v-if="selected.id">
        <v-btn class="" @click="handleCopy"> Copy </v-btn>
        <v-btn class="" @click="handleMove"> Move </v-btn>
        <v-btn class="" @click="handleDelete"> Delete </v-btn>
      </div>
    </div>
    <div class="files--container">
      <div
        v-for="file in files"
        :key="file.id"
        class="file"
        :file-id="file.id"
        :class="{ selected: file.id == selected?.id }"
        @click="handleFileClicked(file)"
        @dblclick="handleFileDbclicked(file)"
        ref="fileElement"
      >
        <img
          v-if="file.type == 'folder'"
          src="@/assets/folder.png"
          alt="icon"
        />
        <img
          v-else-if="file.type == 'image'"
          src="@/assets/image.png"
          alt="icon"
        />
        <img v-else src="@/assets/file.png" alt="icon" />
        <p>{{ file.name }}</p>
      </div>
    </div>
    <transition name="fade" appear mode="out-in">
      <div class="image-viewer" v-show="imageInView" @click="closeImage">
        <img v-show="imageInView" :src="imageInView" alt="image-viewer" />
      </div>
    </transition>
  </div>
</template>

<style></style>
