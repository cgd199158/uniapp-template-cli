<template>
  <view class="db-viewModule" :style="{ margin: `${type == 2 ? 24 : 0}rpx` }">
    <view class="db-viewModule__wrap">
      <view v-if="title" class="db-viewModule__header">
        <view class="header-title">
          {{ title }}
        </view>
        <view class="header-right">
          <slot name="right"></slot>
        </view>
      </view>
      <view class="db-viewModule__main">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'DbViewModule',
    props: {
      title: {
        type: String,
        default: '',
      },
      type: {
        type: [String, Number],
        default: 1, // 1: 默认样式 2: 周边有间隙
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .db-viewModule {
    // width: 100%;

    &__wrap {
      // width: 100%;
      background-color: #fff;
      border-radius: 10rpx;
      box-shadow: $uni-shadow;
    }

    &__header {
      font-size: 32rpx;
      padding: 24rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-title {
        &:before {
          content: '';
          display: inline-block;
          width: 8rpx;
          height: 32rpx;
          background-color: $uni-color-primary;
          position: relative;
          top: 6rpx;
          margin-right: 10rpx;
        }
      }
      .header-right {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    &__main {
      padding: 0 24rpx 24rpx;
      font-size: 28rpx;
    }
  }
</style>
