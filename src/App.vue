<script>
  export default {
    onLaunch: function () {},
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    },
  }
</script>

<style lang="scss">
  @import url('@/static/styles/common.css');
  @import url('@/static/styles/theme.css');

  uni-page-body {
    height: 100%;
    font-size: 28rpx;
    background: #f1f4fa;
    // --fui-bg-color-content: #F8F8F8;
  }

  uni-toast {
    z-index: 999999999999;
  }

  * {
    box-sizing: border-box;
  }

  .db-btn {
    &:active {
      opacity: 0.8 !important;
    }
  }

  .db-btn-white {
    &:active {
      background-color: #fafafa !important;
    }
  }

  ::v-deep .fui-input__number {
    input {
      border: none !important;
    }
  }

  $table-border-color: #999;
  .db-table {
    border: solid $table-border-color;
    border-width: 2rpx 0 0 2rpx;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;

    th {
      font-weight: bold;
      text-align: center;
    }

    th,
    td {
      border: solid $table-border-color;
      border-width: 0 2rpx 2rpx 0;
      padding: 8rpx 14rpx;
      text-align: center;
      // white-space: nowrap;
    }
  }
  // 签名宽高处理
  .recruit-canvas .canvas-box #canvas-map {
    width: 100% !important;
    height: 100% !important;
  }

  // 签名宽高处理
  .recruit-canvas uni-canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .db-tip {
    font-size: 24rpx;
    color: $uni-color-error;
  }

  // 修复钉钉100vh导航被挡住的问题
  .page {
    width: 100%;
    height: 100vh !important;
  }
  .page-full {
    height: calc(100vh - 72rpx) !important;
  }
</style>
