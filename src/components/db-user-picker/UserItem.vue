<template>
  <view class="user-item" @click="handlerItem">
    <view class="user-item__left">
      <DbRadio :value="getChecked()" />
      <fui-avatar mode="aspectFill" :src="avatarUrl" style="margin-left: 10rpx" width="70" />
      <text class="user-name">{{ data.name }}</text>
    </view>
  </view>
</template>

<script>
  import DbRadio from '../db-radio/index.vue'
  export default {
    name: 'UserItem',
    components: { DbRadio },
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      value: {
        type: Boolean,
        default: false,
      },
      multiple: {
        type: Boolean,
      },
    },
    data() {
      return {}
    },
    computed: {
      avatarUrl: function () {
        const { data } = this
        if (data.avatar) return data.avatar
        if (data.gender == 1) {
          return require('@/static/imgs/men_avatar.png')
        } else {
          return require('@/static/imgs/women_avatar.png')
        }
      },
    },
    methods: {
      getChecked() {
        return this.value
      },
      // 切换选中
      handlerItem() {
        this.$emit('change', { value: !this.value, data: this.data })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .user-item {
    display: flex;
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    font-size: 32rpx;
    position: relative;

    &:active {
      background-color: $uni-bg-color-hover;
    }

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      left: 80rpx;
      right: 0;
      bottom: 0;
      height: 1px;
      background: $uni-border-color;
    }

    &__left {
      flex: 1;
      display: flex;
      align-items: center;

      .user-name {
        margin-left: 10rpx;
      }
    }
  }
</style>
