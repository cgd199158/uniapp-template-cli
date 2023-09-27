<template>
  <fui-textarea
    v-bind="$attrs"
    v-model="inputValue"
    :borderBottom="false"
    :borderTop="false"
    :clearable="disabled ? false : clearable"
    :disabled="disabled"
    :padding="padding"
    :placeholder="placeholder"
    size="28"
    @input="valueChange"
  />
</template>

<script>
  export default {
    name: 'DbTextarea',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      placeholder: {
        type: String,
        default: '请输入',
      },
      padding: {
        type: Array,
        default: () => [0],
      },
      borderBottom: {
        type: Boolean,
        default: false,
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        inputValue: '',
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: function (val) {
          this.inputValue = val
        },
      },
    },
    methods: {
      valueChange(value) {
        this.$emit('change', value)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
