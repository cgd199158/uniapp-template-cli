<template>
  <view class="db-list">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <view v-for="(item, index) in dataList" class="item">
        <view class="item-title">{{ item }}</view>
      </view>
    </z-paging>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        dataList: [],
      }
    },
    methods: {
      queryList(pageNo, pageSize) {
        //这里的pageNo和pageSize会自动计算好，直接传给服务器即可
        //这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过this.$refs.paging.complete(请求回来的数组)将请求结果传给z-paging
        this.$refs.paging.complete([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
      },
    },
  }
</script>

<style scoped lang="scss">
  .db-list {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
  }
</style>
