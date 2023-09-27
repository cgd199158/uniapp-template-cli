<template>
  <fui-input
    v-model="inputValue"
    :borderBottom="false"
    :clearable="disabled ? false : clearable"
    :disabled="disabled"
    :formatValue="formatValue"
    :padding="padding"
    :placeholder="placeholder"
    :type="type"
    @click="handlerClick"
    @input="valueChange"
  >
    <!-- <fui-button  type="gray" bold width="200rpx" height="64rpx" :size="28" text="获取验证码"></fui-button> -->
    <fui-icon v-if="arrow" color="#ccc" name="arrowright" size="32" />
  </fui-input>
</template>

<script>
  export default {
    name: 'DbInput',
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
      // 扩展属性,显示右侧箭头
      arrow: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'text',
      },
      onClick: {
        type: Function,
        default: () => {},
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
          this.inputValue = this.formatValue(val)
        },
      },
    },
    mounted() {
      this.$emit('init')
    },
    methods: {
      formatValue(value) {
        if (this.type === 'money') {
          return this.$t.toMoney(value)
        }
        return value
      },
      valueChange(value) {
        this.$emit('change', value)
        if (_.isFunction(this.onChange)) {
          this.onChange(value)
        }
      },
      // 点击事件
      handlerClick() {
        if (this.onClick && _.isFunction(this.onClick)) {
          this.onClick(this.value)
        }
      },
    },
  }
</script>

<style></style>
