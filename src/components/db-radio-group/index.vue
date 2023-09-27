<template>
  <fui-radio-group v-model="val" name="radio" @change="radioChange">
    <view class="fui-list__item">
      <fui-label v-for="item in optionList" :key="item.value" :margin="['0', '40rpx', '0', '0']">
        <view class="fui-align__center">
          <fui-radio :checked="item.value == val" :disabled="disabled" :value="item.value" />
          <text class="fui-text">{{ item.label }}</text>
        </view>
      </fui-label>
    </view>
  </fui-radio-group>
</template>

<script>
  export default {
    name: 'DbRadioGroup',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      optionList: {
        type: [Array],
        default: () => [],
      },
      onChange: {
        type: Function,
        default: () => {},
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        val: '',
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: function (newValue) {
          this.val = newValue
        },
      },
    },
    methods: {
      radioChange(data) {
        const value = data.detail.value
        this.$emit('change', value)
        if (this.onChange && _.isFunction(this.onChange)) {
          this.onChange(value)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fui-list__item {
    display: flex;
  }

  .fui-text {
    margin-left: 12rpx;
  }
</style>
