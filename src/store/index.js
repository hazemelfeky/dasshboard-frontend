import { defineStore } from "pinia";

export const useTerminalStore = defineStore("terminal", () => {
  let id = 0;
  const tabs = ref([
    {
      id,
      value: 0,
      name: 0,
      /*
        thread:
          address > instruction
          message
      */
      threads: [
        { address: "hazem ", instruction: "instruction", message: "message" },
      ],
      currentThread: { address: "hazem " },
      // TODO: add → ended: true to current, to simulate if it's run something like yarn dev
      // so no go directly to next instuction
    },
  ]);

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

  const addNewInstruction = (tab, newThread) => {
    tab.threads.push(newThread)
    tab.currentThread = { address: "hazem " }
  }

  return { tabs, addNewInstruction, addTab, closeTab };
});
