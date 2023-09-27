<template>
  <view class="db-page">
    <view v-if="header" class="db-page__header">
      <slot name="#header">
        <db-header v-bind="$attrs" :add="add" :back="back" @leftClick="leftClick" @rightClick="rightClick">
          <template #default>
            <slot name="headerLeft"></slot>
          </template>
          <template #right>
            <slot name="headerRight"></slot>
          </template>
        </db-header>
      </slot>
    </view>
    <view class="db-page__content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      // 是否显示nabBar
      header: {
        type: Boolean,
        default: true,
      },
      // 是否显示返回按钮, 如果为Funciton则直接点击调用
      back: {
        type: [Function, Boolean],
        default: true,
      },
      // 是否显示新增按钮, 如果为Funciton则直接点击调用
      add: {
        type: [Function, Boolean],
        default: false,
      },
    },
    data() {
      return {}
    },
    methods: {
      leftClick() {
        this.$emit('left-click')
      },
      rightClick() {
        this.$emit('right-click')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-page {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    &__header {
      flex: 0;
      flex-shrink: 0;
      z-index: 999;
    }

    &__content {
      width: 100%;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
    }
  }
</style>
