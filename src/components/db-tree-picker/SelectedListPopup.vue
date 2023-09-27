<template>
  <fui-bottom-popup background="#F1F4FA" :show="visible" @close="handlerClose">
    <db-page :back="() => {}" :class="['page']" title="已选择">
      <template #headerLeft>
        <view class="db-btn" style="color: #fff" @click.stop="handlerClose">
          <fui-icon color="#fff" name="close" size="38" />
        </view>
      </template>
      <template #headerRight>
        <view class="db-btn" style="color: #fff" @click="handlerClear">清空</view>
      </template>
      <view v-if="value && value.length" class="selected-list">
        <scroll-view scroll-y :show-scrollbar="false" style="height: 100%">
          <view v-for="(item, index) in value" :key="item.id" class="selected-list-item" @click="handlerDelete(index)">
            <view class="selected-list-item__left">
              {{ item.label }}
              <span v-if="item.childLen > 0" style="color: #999; padding-left: 10rpx">(包含{{ item.childLen }}个下级)</span>
            </view>
            <view class="selected-list-item__right">删除</view>
          </view>
        </scroll-view>
      </view>
      <DbEmpty v-else title="暂无选中内容~" />
    </db-page>
  </fui-bottom-popup>
</template>

<script>
  import DbEmpty from '../db-empty/index.vue'

  export default {
    name: 'SelectedListPopup',
    components: { DbEmpty },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      handlerClose() {
        this.visible = false
      },
      open() {
        this.visible = true
      },
      handlerDelete(index) {
        const list = _.cloneDeep(this.value)
        list.splice(index, 1)
        this.$emit('change', list)
      },
      handlerClear() {
        this.$emit('change', [])
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    height: 60vh !important;
  }
  .selected-list {
    background-color: #fff;
    height: 100%;
    overflow: hidden;

    &-item {
      padding: 20rpx 30rpx;
      border-bottom: 1px solid $uni-border-color;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__right {
        font-size: 26rpx;
        color: $uni-color-error;
      }
    }
  }
</style>
