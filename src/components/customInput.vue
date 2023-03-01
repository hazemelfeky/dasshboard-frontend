<script setup>
const props = defineProps({
  modelValue: String,
  test: String,
})


const emit = defineEmits()
function handleChange(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="input">
    <input :value="modelValue" @input="handleChange" type="text" v-bind="$attrs"/>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.input {
  
  input {
    font-size: 24px;
    width: -webkit-fill-available;
    height: 4rem;
    border-radius: 4rem;
    padding: 14px 24px;
    border: 1px solid #2c2c2c70;
    outline: none;
  }
}

</style>