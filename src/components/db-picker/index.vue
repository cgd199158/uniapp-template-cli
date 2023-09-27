<template>
  <view class="db-picker">
    <template v-if="$slots.default">
      <view @click.native="handlerInput">
        <slot></slot>
      </view>
    </template>
    <db-input v-else :arrow="arrow" disabled :placeholder="placeholder" :value="inputText" @click.native="handlerInput" />
    <fui-bottom-popup radius="0" :show="visible" @close="handlerClose">
      <db-page-list
        ref="pageList"
        :auto="false"
        :back="handlerClose"
        :class="['page', { 'page-full': $t.isDingTalk() }]"
        :dataSource="dataSource"
        style="background-color: #f1f4fa"
        :title="title"
      >
        <template #default="{ item }">
          <DbPickerItem v-if="config" :config="config" :data="item" :selectedList="selectedList" @click.native="handlerItem(item)" />
          <fui-alert v-else title="请先配置config" />
        </template>
        <!-- 顶部内容, 如tabs -->
        <template #top>
          <slot name="top"></slot>
        </template>
        <template #bottom>
          <view class="db-picler__footer" slot="bottom">
            <view class="footer__left">已选中：{{ (selectedList && selectedList.length) || 0 }}</view>
            <view class="footer__right db-btn" @click="handlerSubmit">确定</view>
          </view>
        </template>
      </db-page-list>
    </fui-bottom-popup>
  </view>
</template>

<script>
  import DbPageList from '../db-page-list/index.vue'
  import DbInput from '../db-input/index.vue'
  import DbPickerItem from './DbPickerItem.vue'

  export default {
    name: 'DbPicker',
    components: {
      DbInput,
      DbPageList,
      DbPickerItem,
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      multiple: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '请选择',
      },
      // 当dataSource为函数时,必须是个数组, 当dataSource是数组时必须是字符串
      value: {
        type: [String, Array],
        default: '',
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
      dataSource: {
        type: [Function, Array],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      // 默认显示向右的箭头
      arrow: {
        type: Boolean,
        default: true,
      },
      // 列表展示配置信息
      config: {
        type: Object,
      },
    },
    data() {
      return {
        visible: false,
        dataList: [], // 数据列表
        selectedList: [], // 当前选中的value数组 {value, label}
      }
    },
    computed: {
      // 根据数据源来判断,如果是数组则直接渲染,如果是列表则不处理
      isFull: function () {
        const { dataSource } = this
        if (_.isArray(dataSource)) return true
        return false
      },
      inputText: function () {
        const { multiple, dataSource, value } = this
        // dataSource为函数时
        if (!this.isFull) {
          if (_.isArray(value)) {
            return value.map((item) => item.label).join(',')
          }
        }
        // dataSource为数组时
        if (this.isFull) {
          if (_.isString(value)) {
            const valueArr = value.split(',')
            const dataArr = valueArr.map((item) => _.find(dataSource, (dataItem) => dataItem.value == item)).filter((item) => item)
            return dataArr.map((item) => item.label).join(',')
          }
        }
        return ''
      },
    },
    watch: {
      value: {
        immediate: true,
        handler: function (val) {
          const { dataSource, isFull } = this
          if (isFull && val) {
            this.selectedList = val.split(',').map((item) => ({
              value: item,
            }))
            return
          }
          if (!isFull && _.isArray(val)) {
            this.selectedList = val
            return
          }
          this.selectedList = []
        },
      },
    },
    methods: {
      reload() {
        this.$refs.pageList.reload()
      },
      handlerInput() {
        if (this.disabled) return
        this.visible = true
        this.$refs.pageList.reload()
      },
      // 点击提交
      handlerSubmit(data) {
        const { isFull, selectedList = [] } = this
        let result = ''
        if (isFull) {
          result = selectedList.map((item) => item.value).join(',')
        } else {
          result = selectedList
        }
        this.$emit('change', result)
        this.handlerClose()
      },
      // 关闭
      handlerClose() {
        this.visible = false
      },
      // 点击列
      handlerItem(item) {
        const { multiple } = this
        const index = _.findIndex(this.selectedList, (selected) => selected.value == item.value)
        if (multiple) {
          if (index !== -1) {
            this.selectedList.splice(index, 1)
          } else {
            this.selectedList.push(item)
          }
        } else {
          if (index !== -1) {
            this.selectedList = []
          } else {
            this.selectedList = [item]
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-picker {
    // background-color: #F1F4FA;
  }

  .db-picler__footer {
    display: flex;
    height: 86rpx;
    align-items: center;
    border: 1px solid $uni-color-primary;
    position: relative;
    font-size: 32rpx;

    .footer__left,
    .footer__right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .footer__left {
      justify-content: flex-start;
      padding: 0 24rpx;
    }

    .footer__right {
      background-color: $uni-color-primary;
      color: #fff;
    }
  }
</style>
