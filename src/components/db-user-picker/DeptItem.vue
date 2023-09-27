<template>
  <view :class="['dept-item', { 'dept-item--disabled': !multiple }]" @click="handlerItem">
    <div class="dept-item__left">
      <DbRadio v-if="multiple" :value="getChecked()" />
      <text class="dept-name">{{ data.name }}</text>
    </div>
    <div :class="['dept-item__right', 'db-btn', { 'dept-item__right--disabled': !multiple ? false : value }]" @click.stop="handlerRight">
      <svg class="icon" height="16" p-id="11259" version="1.1" viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M512 563.2a102.4 102.4 0 0 0 102.4 102.4h307.2a102.4 102.4 0 0 0 102.4-102.4V460.8a102.4 102.4 0 0 0-102.4-102.4h-307.2a102.4 102.4 0 0 0-102.4 102.4H307.2V307.2h102.4a102.4 102.4 0 0 0 102.4-102.4V102.4a102.4 102.4 0 0 0-102.4-102.4H102.4a102.4 102.4 0 0 0-102.4 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4v563.2a51.2 51.2 0 0 0 51.2 51.2h256a102.4 102.4 0 0 0 102.4 102.4h307.2a102.4 102.4 0 0 0 102.4-102.4v-102.4a102.4 102.4 0 0 0-102.4-102.4h-307.2a102.4 102.4 0 0 0-102.4 102.4H307.2v-256z m102.4-102.4h307.2v102.4h-307.2zM102.4 204.8V102.4h307.2v102.4z m512 614.4h307.2v102.4h-307.2z"
          :fill="!multiple ? '#1087DD' : value ? '#ccc' : '#1087DD'"
          p-id="11260"
        />
      </svg>
      <text>下级</text>
    </div>
  </view>
</template>

<script>
  import DbRadio from '../db-radio/index.vue'

  export default {
    name: 'DeptItem',
    components: { DbRadio },
    props: {
      data: {
        type: [Object],
        required: true,
        default: () => ({}),
      },
      value: {
        type: [String, Array, Boolean],
        default: false,
      },
      multiple: {
        type: Boolean,
      },
    },
    data() {
      return {}
    },
    methods: {
      getChecked() {
        if (!this.multiple) return false
        return this.value
      },
      // 点击右侧
      handlerRight() {
        if (this.value) return
        this.$emit('handlerRight', this.data)
      },
      // 切换选中
      handlerItem() {
        this.$emit('change', { value: !this.value, data: this.data })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .dept-item {
    display: flex;
    padding: 30rpx 30rpx;
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

      .dept-name {
        margin-left: 10rpx;
      }
    }

    &__right {
      flex: 0 0 120rpx;
      display: flex;
      align-items: center;
      color: $uni-color-primary;
      justify-content: flex-end;
      font-size: 28rpx;
      position: relative;

      &::before {
        content: '';
        display: inline-block;
        width: 1px;
        position: absolute;
        left: 0rpx;
        top: 0;
        height: 40rpx;
        background: $uni-border-color;
      }

      text {
        margin-left: 10rpx;
      }

      &--disabled {
        color: $uni-text-color-disable;
      }
    }

    &--disabled {
      &:active {
        background-color: #fff;
        color: #666;
      }
    }
  }
</style>
