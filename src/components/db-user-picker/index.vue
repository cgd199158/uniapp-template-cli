<template>
  <view class="db-picker">
    <view @click.native="handlerInput">
      <slot>
        <db-input :arrow="arrow" disabled :placeholder="placeholder" :value="inputText" />
      </slot>
    </view>
    <fui-bottom-popup background="#F1F4FA" radius="0" :show="visible" @close="handlerClose">
      <db-page :back="handlerClose" :class="['page', { 'page-full': $t.isDingTalk() }]" style="background-color: none" title="选择人员">
        <template #headerLeft>
          <view style="color: #fff; display: flex; align-items: center">
            <fui-icon color="#fff" name="arrowleft" :size="48" />
            关闭
          </view>
        </template>
        <view class="userPicker-search">
          <fui-search-bar disabled @click="handlerSearch" />
        </view>
        <view class="userPicker-router">
          <scroll-view scroll-x="true" :show-scrollbar="false" style="white-space: nowrap">
            <div
              v-for="(item, index) in routerList"
              :key="item.id"
              class="router-item"
              :style="{ color: routerList.length > 1 && index === routerList.length - 1 ? '#333' : '#1087DD' }"
              @click="handlerRouter(item)"
            >
              {{ item.name }}
              <fui-icon v-if="routerList.length - 1 !== index" color="#1087DD" name="arrowright" size="38" />
            </div>
          </scroll-view>
        </view>
        <view class="userPicker-main">
          <view class="userPicker-main__top">
            <scroll-view scroll-y="true" :show-scrollbar="false" style="height: 100%">
              <template v-if="(curDeptList && curDeptList.length > 0) || (curUserList && curUserList.length > 0)">
                <view v-if="multiple" class="userPicker-all" @click="handlerAll">
                  <DbRadio :value="getAllChecked()" />
                  <text class="all-name">全选</text>
                </view>
                <view class="userPicker-dept">
                  <DeptItem
                    v-for="item in curDeptList"
                    :key="item.id"
                    :data="item"
                    :multiple="multiple"
                    :value="getItemChecked(item)"
                    @change="handlerItemCheck"
                    @handlerRight="handlerNextDept"
                  />
                </view>
                <view class="userPicker-dept">
                  <UserItem
                    v-for="item in curUserList"
                    :key="item.id"
                    :data="item"
                    :multiple="multiple"
                    :value="getItemChecked(item)"
                    @change="handlerItemCheck"
                  />
                </view>
              </template>
              <template v-else>
                <DbEmpty title="暂无相关人员~" />
              </template>
            </scroll-view>
          </view>

          <view :class="['userPicker-footer', { 'userPicker-footer--disabled': !canSubmit }]">
            <view class="userPicker-footer__left" @click="showSelectedListPopup">
              已选中:
              <text v-show="checkedAllUserList && checkedAllUserList.length > 0">{{ checkedAllUserList.length }}人</text>
              <text v-show="checkedDeptList && checkedDeptList.length > 0">(其中包含{{ checkedDeptList.length }}个部门)</text>
            </view>
            <view :class="['userPicker-footer__right', { 'db-btn': canSubmit }]" @click="handlerSubmit">确定</view>
          </view>
        </view>
      </db-page>
    </fui-bottom-popup>
    <!-- 已选中人员 -->
    <SelectedListPopup ref="selectedListPopup" v-model="selectedList" />
    <!-- 搜索组件 -->
    <SearchPopup ref="searchPopup" v-model="selectedList" :userData="userList" @change="handlerItemCheck" />
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import { reqAllUserList } from '@/apis/sys'
  import DbInput from '../db-input/index.vue'
  import DeptItem from './DeptItem.vue'
  import UserItem from './UserItem.vue'
  import DbRadio from '../db-radio/index.vue'
  import DbEmpty from '../db-empty/index.vue'
  import SelectedListPopup from './SelectedListPopup.vue'
  import SearchPopup from './SearchPopup.vue'

  export default {
    name: 'DbUserPicker',
    components: { DbInput, DbRadio, DbEmpty, DeptItem, UserItem, SelectedListPopup, SearchPopup },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [Array, Object, String],
        default: () => '',
      },
      placeholder: {
        type: String,
        default: '选择人员',
      },
      arrow: {
        type: Boolean,
        default: true,
      },
      // 是否多选,默认单选
      multiple: {
        type: Boolean,
        default: false,
      },
      // 默认的顶级节点ID
      topNodeId: {
        type: String,
        default: 'Root',
      },
      onChange: {
        type: Function,
      },
    },
    data() {
      return {
        visible: false,
        routerList: [{ id: this.topNodeId, name: '通讯录' }],
        selectedList: [], // 选中的数据
        checkAll: false, //当前是否全选
        searchKey: '', // 搜索的关键字
      }
    },
    computed: {
      ...mapState(['userList']),
      inputText: function () {
        const { value, multiple } = this
        if (multiple && _.isArray(value)) {
          return value.map((item) => item.name || item.nickname).join(',') || ''
        }
        if (!multiple && _.isObject(value)) {
          return value.name || value.nickname
        }
        return ''
      },
      treeData: function () {
        const { userList } = this
        if (_.isArray(userList) && userList.length) {
          return this.$t.arrayToTree(userList)
        }
        return []
      },
      // 当前页面展示的数据的pid
      curPId: function () {
        const { routerList } = this
        return routerList[routerList.length - 1].id
      },
      // 当前页面展示的组织机构list数据
      curDeptList: function () {
        const { curPId, userList } = this
        return userList.filter((item) => item.pid === curPId && item.type === 'node')
      },
      // 当前页面展示的用户list数据
      curUserList: function () {
        const { curPId, userList } = this
        return userList.filter((item) => item.pid === curPId && item.type === 'user')
      },
      // 当前选中的组织机构
      checkedDeptList: function () {
        const { selectedList } = this
        return selectedList.filter((item) => item.type === 'node')
      },
      // 当前选中的用户列表
      checkedUserList: function () {
        const { selectedList } = this
        return selectedList.filter((item) => item.type === 'user' || !item.type)
      },
      // 是否可以提交
      canSubmit: function () {
        const { multiple, checkedAllUserList } = this
        if (!multiple && checkedAllUserList.length == 1) return true
        if (multiple && checkedAllUserList.length > 0) return true
        return false
      },
      // 当前选中的所有的人包含组织机构下面的人员
      checkedAllUserList: function () {
        const { checkedUserList, checkedDeptList, userList } = this
        let result = []
        result = result.concat(checkedUserList)
        // 获取组织部门下所有的用户
        const getDeptUser = function (obj) {
          if (obj.type === 'user') {
            result.push(obj)
          }
          if (obj.type === 'node') {
            const childList = userList.filter((item) => item.pid === obj.id)
            childList.map((item) => getDeptUser(item))
          }
        }
        checkedDeptList.map((item) => getDeptUser(item))
        return _.uniqBy(result, 'id')
      },
    },
    mounted() {
      this.$store.dispatch('getUserList')
    },
    provide() {
      return {
        getItemChecked: this.getItemChecked,
      }
    },
    methods: {
      // 提交
      handlerSubmit() {
        const { canSubmit, checkedAllUserList, multiple } = this
        if (!canSubmit) return
        let result = checkedAllUserList
        if (!multiple) {
          result = (checkedAllUserList && checkedAllUserList[0]) || ''
        }
        this.$emit('change', result)
        if (_.isFunction(this.onChange)) {
          this.onChange(result)
        }
        this.handlerClose()
      },
      // 获取列表信息
      // getUserList() {
      //   reqAllUserList().then((res) => {
      //     if (res.code === 1) {
      //       this.userList = res.data.map((item) => ({ ...item, label: item.label || item.nickname, name: item.label || item.nickname })) || []
      //     }
      //   })
      // },
      // 获取当前列是否被选中
      getItemChecked(data) {
        const { selectedList } = this
        const findItem = _.find(selectedList, (item) => item.id == data.id)
        if (findItem) return true
        return false
      },
      // 当前列被点击
      handlerItemCheck({ value, data }) {
        const { selectedList, multiple } = this
        if (multiple) {
          const index = _.findIndex(selectedList, (item) => item.id == data.id)
          if (index !== -1) {
            this.selectedList.splice(index, 1)
          } else {
            this.selectedList.push(data)
          }
        } else {
          console.log('--------> data : ', data)
          if (data.type === 'node') return
          if (value) {
            this.selectedList = [data]
          } else {
            this.selectedList = []
          }
        }
      },
      // 点击组织机构右侧
      handlerNextDept(item) {
        this.routerList.push({ id: item.id, name: item.label })
      },
      // 切换路由
      handlerRouter(item) {
        this.checkAll = false
        const _router = _.cloneDeep(this.routerList)
        const index = _.findIndex(_router, ['id', item.id])
        this.routerList = _router.splice(0, index + 1)
      },
      // 是否全选
      getAllChecked() {
        return this.checkAll
      },
      // 点击全选
      handlerAll() {
        const { checkAll, curDeptList, curUserList, selectedList } = this
        // 去重
        this.checkAll = !checkAll
        if (this.checkAll) {
          const checkedAll = [...curDeptList, ...curUserList, ...selectedList]
          const uniqCheckedAll = _.uniqBy(checkedAll, 'id')
          this.selectedList = uniqCheckedAll
        } else {
          const result = _.pullAllBy(selectedList, [...curDeptList, ...curUserList], 'id')
          this.selectedList = _.cloneDeep(result)
        }
      },
      // 打开选中的人员列表
      showSelectedListPopup() {
        this.$refs.selectedListPopup.open()
      },
      // 点击输入框
      handlerInput() {
        const { multiple, value } = this
        if (multiple && _.isArray(value)) {
          this.selectedList = value
        }
        if (!multiple && _.isObject(value)) {
          this.selectedList = [value]
        }
        this.checkAll = false
        this.visible = true
      },
      // 关闭选人
      handlerClose() {
        this.visible = false
      },
      // 点击搜索人员
      handlerSearch() {
        this.$refs.searchPopup.open()
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .db-page__content {
    display: flex;
    flex-direction: column;
  }

  .userPicker-box {
    width: 100%;
    height: 100%;
  }

  .userPicker-search {
    background-color: #fff;
  }

  .userPicker-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &__top {
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
  }

  .userPicker-footer {
    flex: 0 0 92rpx;
    flex-shrink: 0;
    background-color: #fff;
    display: flex;
    border: 1px solid $uni-color-primary;

    &__left {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
    }

    &__right {
      flex: 0 0 190rpx;
      background-color: $uni-color-primary;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 32rpx;
    }

    &--disabled {
      opacity: 0.6;
    }
  }

  // 路由
  .userPicker-router {
    padding: 0 24rpx;
    font-size: 32rpx;
    white-space: nowrap;
    background-color: #fff;
    border-bottom: 1px solid $uni-border-color;

    .router-item {
      line-height: 80rpx;
      display: inline-block;
      color: $uni-color-primary;
    }
  }

  .userPicker-all {
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-bottom: 30rpx;

    .all-name {
      margin-left: 10rpx;
    }
  }
</style>
