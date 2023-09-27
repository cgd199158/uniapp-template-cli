<template>
  <view class="db-header">
    <!-- <fui-status-bar :background="background" /> -->
    <fui-nav-bar v-bind="$attrs" :background="background" :color="color" :splitLine="splitLine" :title="title" @leftClick="leftClick" @rightClick="rightClick">
      <template #default>
        <slot>
          <fui-icon v-if="back" :color="color" name="arrowleft" :size="48" />
        </slot>
      </template>
      <template #right>
        <slot name="right">
          <fui-icon v-if="add" :color="color" name="plus" />
        </slot>
      </template>
    </fui-nav-bar>
  </view>
</template>

<script>
  export default {
    name: 'DbHeader',
    props: {
      title: {
        type: String,
        default: '标题',
      },
      splitLine: {
        type: Boolean,
        default: true,
      },
      background: {
        type: [String],
        default: 'linear-gradient(300deg, #1087DD, #1087DD)',
      },
      color: {
        type: String,
        default: '#fff',
      },
      back: {
        type: [Function, Boolean],
        default: true,
      },
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
        const { back } = this
        if (back) {
          if (_.isFunction(back)) {
            back()
          } else {
            this.goBack()
          }
        }
        this.$emit('left-click')
      },
      goBack() {
        /*uni.navigateBack({
				delta: 1
			})*/
        //@zxyuns 处理兼容，如果没有上一级界面则返回首页
        const pages = getCurrentPages()
        if (pages.length === 2) {
          uni.navigateBack({
            delta: 1,
          })
        } else if (pages.length === 1) {
          this.$Router.push({
            path: '/pages/home/index',
          })
        } else {
          uni.navigateBack({
            delta: 1,
          })
        }
      },
      rightClick() {
        const { add } = this
        if (add && _.isFunction(add)) {
          add()
        }
        this.$emit('right-click')
      },
    },
  }
</script>

<style></style>
