<template>
  <div class="db-picker">
    <view @click.native="handlerInput">
      <slot>
        <db-input :arrow="arrow" disabled :placeholder="placeholder" :value="inputText" />
      </slot>
    </view>
    <!-- 弹出框 start -->
    <fui-bottom-popup background="#F1F4FA" radius="0" :show="visible" @close="handlerClose">
      <db-page :back="handlerClose" :class="['page', { 'page-full': $t.isDingTalk() }]" style="background-color: none" :title="title">
        <template #headerLeft>
          <view style="color: #fff; display: flex; align-items: center">
            <fui-icon color="#fff" name="arrowleft" :size="48" />
            关闭
          </view>
        </template>
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
              <template v-if="curDeptList && curDeptList.length > 0">
                <view v-if="multiple" class="userPicker-all" @click="handlerAll">
                  <DbRadio :value="getAllChecked()" />
                  <text class="all-name">全选</text>
                </view>
                <view class="userPicker-dept">
                  <DeptItem
                    v-for="(item, index) in curDeptList"
                    :key="item.id"
                    :data="item"
                    :multiple="multiple"
                    :value="getItemChecked(item)"
                    @change="handlerItemCheck"
                    @handlerRight="handlerNextDept"
                  />
                </view>
              </template>
              <template v-else>
                <DbEmpty title="暂无相关数据~" />
              </template>
            </scroll-view>
          </view>

          <view v-if="multiple" :class="['userPicker-footer', { 'userPicker-footer--disabled': !canSubmit }]">
            <view class="userPicker-footer__left" @click="showSelectedListPopup">已选中:{{ selectedList.length }}个</view>
            <view :class="['userPicker-footer__right', { 'db-btn': canSubmit }]" @click="handlerSubmit">确定</view>
          </view>
        </view>
      </db-page>
    </fui-bottom-popup>
    <!-- 弹出框 end -->
    <!-- 已选中人员 -->
    <SelectedListPopup ref="selectedListPopup" v-model="selectedList" />
  </div>
</template>

<script>
  import DbInput from '../db-input/index.vue'
  import DbEmpty from '../db-empty/index.vue'
  import DbRadio from '../db-radio/index.vue'
  import DeptItem from './DeptItem.vue'
  import SelectedListPopup from './SelectedListPopup.vue'

  export default {
    name: 'DbTreePicker',
    components: { DbEmpty, DbInput, DbRadio, DeptItem, SelectedListPopup },
    provide() {
      return {
        getItemChecked: this.getItemChecked,
      }
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      // 双向绑定的值,多选为数组,单选为对象
      value: {
        type: [Array, Object, String],
        default: () => '',
      },
      valueType: {
        type: String,
        default: 'default', // default: 多选为数组,单选为对象 | string: 多选为逗号分隔的字符串,单选为字符串
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
      // 是否显示箭头
      arrow: {
        type: Boolean,
        default: true,
      },
      // 标题
      title: {
        type: String,
        default: '组织机构',
      },
      // 树形结构的数据配置
      props: {
        type: Object,
        default: () => ({
          label: 'label',
          id: 'id',
          pid: 'pid',
        }),
      },
      // 是否多选
      multiple: {
        type: Boolean,
        default: false,
      },
      // 外部使用的数据(展开的树形结构,即没有children的数据,如: [{id: 1, pid: 0, label: '测试'}, {id: 2,pid: 1,label: '测试2'}])
      optionList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        visible: false,
        curPId: '', // 当前父级id
        selectedList: [], // 选中的数据
        checkAll: false, //当前是否全选
        searchKey: '', // 搜索的关键字
      }
    },
    computed: {
      options: function () {
        const defaultOptions = {
          label: 'name',
          id: 'id',
          pid: 'pid',
        }
        return { ...defaultOptions, ...(this.props || {}) }
      },
      inputText: function () {
        const { value, valueType, multiple } = this
        if (valueType === 'string') {
          const valueArr = value.split(',')
          // 根据valueArr遍历根据id获取对应的数据列
          const { dataList } = this
          const list = []
          valueArr.forEach((item) => {
            const curItem = dataList.find((dataItem) => dataItem['id'] == item)
            if (curItem) {
              list.push(curItem.label)
            }
          })
          return list.join(',')
        }
        if (multiple && _.isArray(value)) {
          return value.map((item) => item[this.options?.label]).join(',') || ''
        }
        if (!multiple && _.isObject(value)) {
          return value[this.options?.label]
        }
        return ''
      },
      // 路由地址
      routerList: function () {
        let result = [{ id: '', name: this.title }]
        if (!this.curPId) {
          return result
        }
        // 根据当前父级id获取对应的路由
        const { dataList } = this
        const list = []
        let curId = this.curPId
        while (curId) {
          const curItem = dataList.find((item) => item['id'] === curId)
          if (curItem) {
            list.unshift({ id: curItem['id'], name: curItem['label'] })
            curId = curItem['pid']
          } else {
            curId = ''
          }
        }
        return [...result, ...list]
      },
      // 根据options将optionList转换为对应的数据
      dataList: function () {
        let result = []
        const { optionList, options } = this
        if (_.isArray(optionList) && optionList.length) {
          result = optionList.map((item) => {
            const { label, id, pid, children } = options
            return {
              ...item,
              label: item[label],
              id: item[id],
              pid: item[pid],
            }
          })
        }
        return result
      },
      // [{id: '',pid: '', label: '', children: [{id: '',pid: '', label: '', children: [{id: '',pid: '', label: '', children: []}]}]
      treeData: function () {
        const { dataList } = this
        if (_.isArray(dataList) && dataList.length) {
          return this.$t.arrayToTree(dataList)
        }
        return []
      },
      // 当前页面展示的组织机构list数据
      curDeptList: function () {
        const { curPId, treeData, dataList } = this
        if (!curPId) {
          const cloneTreeData = _.cloneDeep(treeData)
          return cloneTreeData.map((item) => {
            const childs = dataList.filter((i) => i.pid === item.id)
            const treeItem = {
              ...item,
              childLen: childs.length || 0,
            }
            delete treeItem.children
            return treeItem
          })
        }
        // 如果curPId有值则根据curPId获取对应的下级数据
        const list = dataList.filter((item) => item.pid === curPId)
        // 获取list中每项是否还有子级
        const result = list.map((item) => {
          const childs = dataList.filter((i) => i.pid === item.id)
          return {
            ...item,
            childLen: childs.length || 0,
          }
        })
        return result
      },
      // 是否可以提交
      canSubmit: function () {
        return true
      },
      // 根据selectedList获取所有选择的值,包括其子级
      selectedAllList: function () {
        const { selectedList, dataList } = this
        let result = []
        const getChildren = (id) => {
          const childs = dataList.filter((item) => item.pid === id)
          if (childs.length) {
            childs.forEach((item) => {
              result.push(item)
              getChildren(item.id)
            })
          }
        }
        selectedList.forEach((item) => {
          result.push(item)
          getChildren(item.id)
        })
        return _.uniqBy(result, 'id')
      },
    },
    mounted() {},
    methods: {
      // 提交
      handlerSubmit() {
        const { valueType, canSubmit, selectedAllList, multiple } = this
        if (!canSubmit) return
        let result = selectedAllList
        if (!multiple) {
          result = (selectedAllList && selectedAllList[0]) || ''
        }
        if (valueType === 'string') {
          const ids = selectedAllList.map((item) => item.id).join(',')
          this.$emit('change', ids)
        } else {
          this.$emit('change', result)
        }
        if (_.isFunction(this.onChange)) {
          this.onChange(result)
        }
        this.handlerClose()
      },
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
          this.selectedList = [data]
          this.handlerSubmit()
        }
      },
      // 点击组织机构右侧
      handlerNextDept(item) {
        this.curPId = item.id
      },
      // 切换路由
      handlerRouter(item) {
        this.checkAll = false
        this.curPId = item.id
      },
      // 是否全选
      getAllChecked() {
        return this.checkAll
      },
      // 点击全选
      handlerAll() {
        const { selectedList } = this
        // 去重
        this.checkAll = !this.checkAll
        if (this.checkAll) {
          const checkedAll = [...selectedList, ...this.curDeptList]
          const uniqCheckedAll = _.uniqBy(checkedAll, 'id')
          this.selectedList = uniqCheckedAll
        } else {
          const result = _.pullAllBy(selectedList, [...this.curDeptList], 'id')
          this.selectedList = _.cloneDeep(result)
        }
      },
      // 打开选中的人员列表
      showSelectedListPopup() {
        console.log('--------> this.$refs.selectedListPopup : ', this.$refs.selectedListPopup)
        this.$refs.selectedListPopup.open()
      },
      // 点击输入框
      handlerInput() {
        const { multiple, value, valueType } = this
        if (valueType === 'string') {
          const ids = value.split(',')
          const result = this.dataList.filter((item) => ids.includes(item.id))
          this.selectedList = result
        } else {
          if (multiple && _.isArray(value)) {
            this.selectedList = value
          }
          if (!multiple && _.isObject(value)) {
            this.selectedList = [value]
          }
        }
        this.checkAll = false
        this.visible = true
      },
      // 关闭选人
      handlerClose() {
        this.visible = false
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
