<template>
  <fui-bottom-popup background="#F1F4FA" radius="0" :show="visible" @close="handlerClose">
    <db-page :back="handlerClose" :class="['page', { 'page-full': $t.isDingTalk() }]" title="搜索人员">
      <view class="search-popup">
        <view class="search-top">
          <fui-search-bar v-if="visible" focus :value="searchKey" @input="searchChange" />
        </view>
        <view class="search-bottom">
          <template v-if="searchResultList && searchResultList.length">
            <UserItem v-for="item in searchResultList" :key="item.id" :data="item" :value="getItemChecked(item)" @change="handlerChange" />
          </template>
          <DbEmpty v-else />
        </view>
      </view>
    </db-page>
  </fui-bottom-popup>
</template>

<script>
  import DbEmpty from '../db-empty/index.vue'
  import UserItem from './UserItem.vue'

  export default {
    components: { DbEmpty, UserItem },
    inject: ['getItemChecked'],
    props: {
      userData: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        searchResultList: [],
        searchKey: '',
        visible: false,
      }
    },
    watch: {
      searchKey: {
        immediate: true,
        handler: function (newValue, oldValue) {
          this.getSearchResultList(newValue)
        },
      },
    },
    methods: {
      handlerClose() {
        this.searchKey = ''
        this.visible = false
      },
      open() {
        this.visible = true
      },
      searchChange(data) {
        this.searchKey = data.detail.value
      },
      // 根据搜索获取数据
      getSearchResultList: _.debounce(function (val) {
        console.log('--------> val : ', val)
        const { userData } = this
        console.log('--------> userData : ', userData)
        if (!val || !userData || !userData.length) {
          this.searchResultList = []
          return
        }

        const result = userData.filter((item) => item.type === 'user' && item.name.indexOf(val) !== -1)
        console.log('--------> result : ', result)
        this.searchResultList = result
      }, 300),
      handlerChange() {
        this.$emit('change', ...arguments)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search-popup {
    display: flex;
    flex-direction: column;
  }

  .search-top {
    flex: 0;
    flex-shrink: 0;
    border-bottom: 1px solid $uni-border-color;
  }

  .search-bottom {
    flex: 1;
  }
</style>
