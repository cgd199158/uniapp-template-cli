<template>
  <fui-form-item v-bind="$attrs" :asterisk="required" labelRight="20">
    <template #left>
      <slot name="left"></slot>
    </template>
    <slot></slot>
    <template #right>
      <slot name="right"></slot>
    </template>
  </fui-form-item>
</template>

<script>
  import DbInput from '../db-input/index.vue'
  export default {
    props: {
      required: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
  }
</script>

<style></style>
