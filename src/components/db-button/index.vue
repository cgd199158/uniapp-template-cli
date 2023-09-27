<template>
  <view class="db-btn-box">
    <fui-button v-if="classify === 'mini'" class="db-btn db-btn__min" v-bind="$attrs" @click="handlerClick">
      <view class="db-btn__main">
        <slot></slot>
      </view>
    </fui-button>
    <fui-button v-else v-bind="$attrs" @click="handlerClick">
      <view class="db-btn__main">
        <slot></slot>
      </view>
    </fui-button>
  </view>
</template>

<script>
  export default {
    props: {
      classify: {
        type: String, // mini: 最小的按钮 small: 小按钮
        default: '',
      },
    },
    data() {
      return {}
    },
    methods: {
      handlerClick() {
        this.$emit('click')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-btn {
    &__min {
      width: auto !important;
      height: 50rpx !important;
      display: flex;
      align-items: center;
      justify-content: center;
      display: inline-block;
      font-size: 23rpx !important;

      ::v-deep .fui-button {
        padding: 0 18rpx !important;
        height: 50rpx !important;
        border-radius: 8rpx !important;
        font-size: 23rpx !important;
      }
    }
  }

  .db-btn-box + .db-btn-box {
    margin-left: 10rpx;
  }

  .db-btn__main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
