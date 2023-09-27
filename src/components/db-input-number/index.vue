<template>
  <fui-input-number
    v-bind="$attrs"
    v-model="inputValue"
    class="db-inputNumber"
    :disabled="disabled"
    :max="max"
    :min="min"
    @change="valueChange"
    @input="onInput"
  />
</template>

<script>
  export default {
    name: 'DbInputNumber',
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
      disabled: {
        type: Boolean,
        default: false,
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 9999999,
      },
      onChange: {
        type: Function,
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
        this.$emit('change', value.value)
        if (_.isFunction(this.onChange)) {
          this.onChange(value.value)
        }
      },
      onInput(value) {
        console.log('value', value)
        this.$emit('input', value)
      },
    },
  }
</script>

<style lang="scss">
  .db-inputNumber {
    .fui-number__input {
      border: none !important;
    }
  }
</style>
