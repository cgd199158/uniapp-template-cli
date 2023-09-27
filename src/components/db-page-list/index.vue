<template>
  <div class="db-pageList">
    <z-paging ref="paging" v-bind="$attrs" v-model="dataList" :auto="auto" :loading-more-enabled="isFull" @query="queryList">
      <template #top>
        <div>
          <!-- navbar -->
          <db-header v-if="header" :add="add" :back="back" :title="title" @leftClick="leftClick" @rightClick="rightClick">
            <template #default>
              <slot name="headerLeft"></slot>
            </template>
            <template #right>
              <slot name="headerRight"></slot>
            </template>
          </db-header>
          <!-- 搜索 -->
          <slot name="top"></slot>
          <fui-search-bar v-if="search" v-bind="searchConfig" @search="handlerSearch" />
        </div>
      </template>
      <view v-for="(item, index) in dataList" :key="item.id || index" class="item">
        <slot :$index="index" :data="item" :item="item"></slot>
      </view>
      <slot name="other"></slot>
      <template #bottom>
        <slot name="bottom"></slot>
      </template>
    </z-paging>
  </div>
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
      title: {
        type: String,
      },
      dataSource: {
        type: [Function, Array],
      },
      // 分页是否显示搜索
      search: {
        type: Boolean,
        default: true,
      },
      searchOptions: {
        type: Object,
        default: () => ({}),
      },
      // 是否自动加载数据
      auto: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        searchKey: '', // 搜索关键字
        dataList: [],
      }
    },
    computed: {
      // 根据数据源来判断,如果是数组则直接渲染,如果是列表则不处理
      isFull: function () {
        const { dataSource } = this
        if (_.isArray(dataSource)) return false
        return true
      },
      searchConfig: function () {
        const { searchOptions } = this
        const defaultOptions = {}
        return {
          ...defaultOptions,
          ...searchOptions,
        }
      },
    },
    methods: {
      // 获取数据
      queryList(pageNo, pageSize) {
        const { dataSource } = this
        if (_.isFunction(dataSource)) {
          dataSource({
            listRows: pageSize,
            pageIndex: pageNo,
            sKeys: this.searchKey,
          }).then((data) => {
            this.$refs.paging.complete(data)
          })
        } else {
          this.$refs.paging.complete(dataSource)
        }
      },
      // 搜索
      handlerSearch({ detail }) {
        const value = detail.value
        this.searchKey = value
        this.$nextTick(() => {
          this.$refs.paging.reload()
        })
      },
      // 重新加载
      reload() {
        this.$refs.paging.reload()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-pageList {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
