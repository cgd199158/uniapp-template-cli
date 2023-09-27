<template>
  <view class="db-detailTable">
    <view v-for="(item, index) in value" :key="index" class="db-detailTable-item">
      <!-- 顶部 -->
      <view class="db-detailTable-item__header">
        <view class="db-detailTable-item__title">{{ title }}{{ index + 1 }}</view>
        <view class="db-detailTable-item__action">
          <view @click="handlerAdd"><fui-text :size="28" text="新增" type="primary" /></view>
          <view v-if="index > 0" style="margin-left: 20rpx" @click="handlerDel(index, item)"><fui-text :size="28" text="删除" type="danger" /></view>
        </view>
      </view>
      <!-- 内容区 -->
      <view class="db-detailTable-item__content">
        <slot :$index="index" :row="item"></slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'DbDetailTable',
    props: {
      title: {
        type: String,
        required: true,
      },
      value: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      handlerAdd() {
        this.$emit('add')
      },
      handlerDel(index, row) {
        this.$emit('delete', { index, row })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-detailTable-item {
    &__header {
      display: flex;
      padding: 20rpx;
      justify-content: space-between;
    }
    &__title {
      font-size: 30rpx;
      color: $uni-text-color-grey;
    }
    &__action {
      display: flex;
    }
  }
</style>
