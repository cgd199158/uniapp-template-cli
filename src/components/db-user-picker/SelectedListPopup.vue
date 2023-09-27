<template>
  <fui-bottom-popup background="#F1F4FA" radius="0" :show="visible" @close="handlerClose">
    <db-page :back="handlerClose" :class="['page', { 'page-full': $t.isDingTalk() }]" title="已选中人员">
      <template #headerRight>
        <view class="db-btn" style="color: #fff" @click="handlerClear">清空</view>
      </template>
      <view v-if="value && value.length" class="selected-list">
        <view v-for="(item, index) in value" :key="item.id" class="selected-list-item" @click="handlerDelete(index)">
          <view class="selected-list-item__left">{{ item.name }}</view>
          <view class="selected-list-item__right">删除</view>
        </view>
      </view>
      <DbEmpty v-else title="暂无选中人员~" />
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
        console.log('--------> index : ', index)
        console.log('--------> this.value : ', this.value)
        const list = _.cloneDeep(this.value)
        list.splice(index, 1)
        console.log('--------> list : ', list)
        this.$emit('change', list)
      },
      handlerClear() {
        this.$emit('change', [])
      },
    },
  }
</script>

<style lang="scss" scoped>
  .selected-list {
    background-color: #fff;

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
