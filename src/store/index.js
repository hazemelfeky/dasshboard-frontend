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

  const host = ref(null);
  const username = ref(null);
  const password = ref(null);

  const getDashboard = async () => {
    const params = {
      host: host.value,
      username: username.value,
      password: password.value,
    };
    console.log("here 1");
    const data = await axios.get("processes", { params });
    console.log("here 2");
    console.log(data.data);
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

  return {
    host,
    username,
    password,
    dashboardData,
    tabs,
    getDashboard,
    addTab,
    closeTab,
  };
});
