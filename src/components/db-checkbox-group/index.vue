<template>
  <fui-checkbox-group v-model="checkboxValue" name="checkbox" @change="onCheckboxChange">
    <view class="fui-list__item">
      <fui-label v-for="item in optionList" :key="item.value" :margin="['0', '20rpx', '0', '0']">
        <view class="fui-align__center">
          <fui-checkbox borderRadius="5rpx" :checked="value && value.indexOf(item.value) !== -1" :value="item.value" />
          <text class="fui-text">{{ item.label }}</text>
        </view>
      </fui-label>
      <!-- <fui-label>
        <view class="fui-align__center">
          <fui-checkbox value="2" borderRadius="5rpx"></fui-checkbox>
          <text class="fui-text">未选中</text>
        </view>
      </fui-label> -->
    </view>
  </fui-checkbox-group>
</template>

<script>
  export default {
    name: 'DbCheckboxGroup',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [Array, String],
        default: () => [],
      },
      optionList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        checkboxValue: [],
      }
    },
    watch: {
      value(newValue) {
        this.checkboxValue = newValue || []
      },
    },
    methods: {
      onCheckboxChange(data) {
        const value = data.detail.value
        this.$emit('change', value)
        if (_.isFunction(this.onChange)) {
          this.onChange(value)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fui-list__item {
    display: flex;
    .fui-text {
      margin-left: 12rpx;
    }
  }
</style>
