import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

export const useStore = defineStore("terminal", () => {
  let id = 0;
  const loading = ref(false);
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
  };

  // This function to handle auth method from backend
  // It's required to add auth data (host,username,password) as query param
  const addAuthToRequest = (endpoint) => {
    return `${endpoint}?host=${host.value}&username=${username.value}&password=${password.value}`;
  };

  const getDashboard = async () => {
    loading.value = true;
    try {
      const data = await axios.get(addAuthToRequest("processes"));
      dashboardData.value = data.data;
    } catch (e) {
      console.log("error catch");
    }
    loading.value = false;
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
    const data = await axios.get(addAuthToRequest("docker/containers"));
    containers.value = data.data;
    return data;
  };

  const getImages = async () => {
    const data = await axios.get(addAuthToRequest("docker/images"));
    images.value = data.data;
    return data;
  };

  const createContainer = async (payload) => {
    // const payload = {
    //   options: "--name hazem",
    //   image: "alpine",
    //   tag: "latest",
    // };
    await axios.post(addAuthToRequest("docker/container/create"), payload);
  };

  const startContainer = async (id) => {
    await axios.patch(addAuthToRequest("/docker/container/start"), { id });
  };
  const pullImage = async (payload) => {
    const data = await axios.post(
      addAuthToRequest("docker/image/pull"),
      payload
    );
    images.value = data.data;
    return data;
  };

  return {
    loading,
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
    createContainer,
    startContainer,
    pullImage,
  };
});
