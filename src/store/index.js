import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

export const useStore = defineStore("terminal", () => {
  let id = 0;
  const tabs = ref([
    {
      id,
      value: 0,
      name: 0,
      threads: [
        { address: "hazem ", instruction: "instruction", message: "message" },
      ],
      currentThread: { address: "hazem " },
    },
  ]);

  const dashboardData = ref([]);

  const host = ref(localStorage.getItem("host") ?? null);
  const username = ref(localStorage.getItem("username") ?? null);
  const password = ref(localStorage.getItem("password") ?? null);

  const saveAuthData = () => {
    localStorage.setItem("host", host.value);
    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);
  }

  const getDashboard = async () => {
    const params = {
      host: host.value,
      username: username.value,
      password: password.value,
    };
    const data = await axios.get("processes", { params });
    dashboardData.value = data.data;
    return data;
  };

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

  // Docker
  const containers = ref([]);
  const images = ref([]);

  const getContainers = async () => {
    const params = {
      host: host.value,
      username: username.value,
      password: password.value,
    };
    const data = await axios.get("docker/containers", { params });
    containers.value = data.data;
    return data;
  };

  const getImages = async () => {
    const params = {
      host: host.value,
      username: username.value,
      password: password.value,
    };
    const data = await axios.get("docker/images", { params });
    images.value = data.data;
    return data;
  };

  const addImage = async () => {
    // const params = {
    //   host: host.value,
    //   username: username.value,
    //   password: password.value,
    // };
    // const data = await axios.get("docker/images");
    // images.value = data.data;
    // return data;
    console.log('addImage');
  };

  return {
    host,
    username,
    password,
    dashboardData,
    tabs,
    containers,
    images,
    saveAuthData,
    getDashboard,
    addTab,
    closeTab,
    getContainers,
    getImages,
    addImage,
  };
});
