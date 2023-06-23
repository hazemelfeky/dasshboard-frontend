<script setup>
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();

const dialog = ref(false);
const loadingLogin = ref(false);
const type = ref("success");

const { host, username, password } = storeToRefs(store);

const getDashboard = store.getDashboard;
const saveAuthData = store.saveAuthData;

const handleSubmit = async () => {
  if (host.value == 1) {
    type.value = "success";
  } else {
    loadingLogin.value = true;
    try {
      const data = await getDashboard();
      if (data.status == 200) {
        type.value = "success";
        saveAuthData();
      } else {
        type.value = "error";
      }
    } catch (e) {
      type.value = "error";
    }
    loadingLogin.value = false;
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
      <v-btn @click="handleSubmit" :loading="loadingLogin">login</v-btn>
    </form>

    <alert-popup :type="type" v-model="dialog" />
  </div>
</template>
