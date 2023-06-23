<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  type: { required: true , validator: (value) => ['error', 'success'].includes(value)},
  // callback: { type: Function, required: false }
})

const emit = defineEmits()
const router = useRouter()
const closeDialog = () => emit('update:modelValue', false)
const loggedIn = () => {
  closeDialog()
  router.push('/dashboard')
}
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card class="alert--popup">
      <div class="icon">
        <v-icon v-if="type == 'error'" icon="$close" size="50" />
        <v-icon v-if="type == 'success'" icon="$check" size="50" />
      </div>
      <div class="my-4" v-if="type == 'error'">
        <v-card-title>
          <h2>ERROR</h2>
        </v-card-title>
        <v-card-subtitle>Please kill me</v-card-subtitle>
      </div>
      <div class="my-4" v-if="type == 'success'">
        <v-card-title>
          <h2>SUCCESS</h2>
        </v-card-title>
        <v-card-subtitle>You have successfully loged in</v-card-subtitle>
      </div>
      <button v-if="type == 'error'" @click="closeDialog">Try Again</button>
      <button v-if="type == 'success'" @click="loggedIn">Containue</button>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.alert--popup {
  background-color: #114D9E;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  min-width: 290px;
  border-radius: 45px !important;
  text-align: center;

  .v-card-title h2, .v-card-subtitle {
    color: white;
  }

  .icon {
    padding: 0.1rem;
    border-radius: 50%;
    background-color: white;

    .v-icon__svg {
      path {
        color: #114D9E;
      }
    }
  }

  button {
    color: #114D9E;
    background-color: white;
    border-radius: 15px;
    padding: 0.5rem 1rem;
  }

}
</style>