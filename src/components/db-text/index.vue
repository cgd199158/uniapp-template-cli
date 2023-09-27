<template>
  <view>{{ value }}</view>
</template>

<script>
  export default {
    name: 'DbText',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {}
    },
  }
</script>

<style></style>
