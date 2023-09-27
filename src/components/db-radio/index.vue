<template>
  <div class="db-radio">
    <fui-icon v-if="value" :color="disabled ? '#CCCCCC' : '#1087DD'" name="checkbox-fill" size="46" />
    <fui-icon v-else :color="disabled ? '#CCCCCC' : '#999'" name="checkround" size="46" />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .db-radio {
    display: inline-flex;
  }
</style>
