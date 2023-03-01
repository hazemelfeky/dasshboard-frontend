<script setup>
import { ref } from "vue"
import customInput from "@/components/customInput.vue";
import alertPopup from "@/components/alertPopup.vue";

const dialog = ref(false)
const type = ref('success')

const ip = ref('')
const username = ref('')
const password = ref('')

const handleSubmit = () => {
  if (ip.value == 1) {
    type.value = 'success'
  } else {
    type.value = 'error'
  }
  dialog.value = true
}

</script>

<template>
  <div class="login">
    <h1 class="logo">LogoLogo</h1>
    <form class="login--form" @submit.prevent="handleSubmit">
      <div class="form--inputs">
        <customInput v-model="ip" placeholder="ip">

        </customInput>
        <customInput v-model="username" placeholder="username">

        </customInput>
        <customInput v-model="password" type="password" placeholder="password">

        </customInput>
        <!-- <input v-model="username" type="text" placeholder="username"/>
          <input type="password" placeholder="password"/> -->
      </div>
      <button>login</button>
    </form>

    <alert-popup :type="type" v-model="dialog" />
  </div>
</template>


