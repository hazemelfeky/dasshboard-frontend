<script setup>
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();

const dialog = ref(false);
const type = ref("success");

const { host, username, password } = storeToRefs(store);

const getDashboard = store.getDashboard;

const handleSubmit = async () => {
  if (host.value == 1) {
    type.value = "success";
  } else {
    const data = await getDashboard();
    console.log(data.status);
    if (data.status == 200) {
      type.value = "success";
    } else {
      type.value = "error";
    }
  }
  dialog.value = true;
};
</script>

<template>
  <div class="login">
    <h1 class="logo"><img src="../assets/logo.png" alt="word logo" /></h1>
    <form class="login--form" @submit.prevent="handleSubmit">
      <div class="form--inputs">
        <customInput v-model="host" placeholder="ip"> </customInput>
        <customInput v-model="username" placeholder="username"> </customInput>
        <customInput v-model="password" type="password" placeholder="password">
        </customInput>
      </div>
      <button>login</button>
    </form>

    <alert-popup :type="type" v-model="dialog" />
  </div>
</template>
