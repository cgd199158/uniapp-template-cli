<template>
  <db-page :header="false" style="background-color: #fff">
    <view class="page-top">
      <view>
        <view class="title">设备维保管理系统</view>
        <view class="sub-title">
          <text>S</text>
          <text>H</text>
          <text>E</text>
          <text>B</text>
          <text>E</text>
          <text>I</text>
          <text>W</text>
          <text>E</text>
          <text>I</text>
          <text>B</text>
          <text>A</text>
          <text>O</text>
          <text>X</text>
          <text>I</text>
          <text>T</text>
          <text>O</text>
          <text>N</text>
          <text>G</text>
        </view>
      </view>
    </view>
    <view class="page-form">
      <view class="form-item" style="margin-bottom: 20rpx">
        <view class="form-item__left">
          <fui-icon color="#1087DD" name="my" size="40" />
        </view>
        <view class="form-item__right">
          <fui-input
            v-model="form.account"
            backgroundColor="rgba(255,255,255,0)"
            clearable
            :padding="['10rpx', '0']"
            placeholder="请输入用户名"
            placeholderStyle="{color: '#999'}"
            :size="30"
            type="text"
          />
        </view>
      </view>
      <view class="form-item">
        <view class="form-item__left">
          <fui-icon color="#1087DD" name="lock" size="40" />
        </view>
        <view class="form-item__right">
          <fui-input
            v-model="form.password"
            backgroundColor="rgba(255,255,255,0)"
            clearable
            :padding="['10rpx', '0']"
            placeholder="请输入密码"
            placeholderStyle="{color: '#999'}"
            :size="30"
            type="password"
          />
        </view>
      </view>
      <view style="margin-top: 120rpx">
        <fui-button text="登录" type="primary" @click="handlerLogin" />
      </view>
      <fui-divider backgroundColor="#fff" style="margin-top: 40rpx" text="第三方登录" />
      <view class="other-box">
        <view class="other-item db-btn" @click="handlerWxLogin">
          <image mode="aspectFit" src="../../static/imgs/login/wechat.png" />
        </view>
        <view class="other-item db-btn" @click="hanlderDTalkLogin">
          <image mode="aspectFit" src="../../static/imgs/login/dingding.png" />
        </view>
      </view>
    </view>
    <view class="footer">v{{ version }}</view>
  </db-page>
</template>

<script>
  import config from '@/common/config.js'

  export default {
    data() {
      return {
        version: config.version,
        title: '内控管理系统',
        loading: false,
        form: {
          account: '',
          password: '',
        },
      }
    },
    computed: {},
    mounted() {},
    methods: {
      // 点击登录
      handlerLogin() {
        this.$Router.push({
          path: '/pages/home/index',
        })
      },
      // 钉钉登录
      hanlderDTalkLogin() {},
      // 钉钉登录
      async loginByDingDing() {},
      // 跳转企业微信登录
      handlerWxLogin() {},
    },
  }
</script>

<style lang="scss" scoped>
  .page-top {
    width: 100%;
    height: 458rpx;
    background-image: url('../../static/imgs/login/login_bg_blue.png');
    background-size: 100% auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    .title {
      font-size: 55rpx;
      width: 500rpx;
      text-align-last: justify;
    }

    .sub-title {
      width: 500rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .page-form {
    margin-top: 20rpx;
    padding: 51rpx;
  }

  .form-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1px solid $uni-border-color;

    &__left {
      flex: 0;
      flex-shrink: 0;
      padding-right: 36rpx;
      padding-left: 10rpx;
    }

    &__right {
      flex: 1;
    }
  }

  .other-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 28rpx;
  }

  .other-item {
    width: 66rpx;
    height: 66rpx;
    border-radius: 66rpx;
    border: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 43rpx;
    }

    & + & {
      margin-left: 36rpx;
    }
  }

  .footer {
    position: fixed;
    padding: 20rpx;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    font-size: 26rpx;
    color: $uni-text-color-placeholder;
    text-align: center;
  }

  ::v-deep .fui-input__border-bottom {
    display: none;
  }
</style>
