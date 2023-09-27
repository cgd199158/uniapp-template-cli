<template>
  <view class="db-select">
    <view @click.native="handlerInput">
      <slot>
        <db-input :arrow="arrow" disabled :placeholder="placeholder" :value="inputText" />
      </slot>
    </view>
    <fui-bottom-popup :show="visible" @close="handlerClose">
      <view v-if="!mustBeLast" class="popup-header">
        <view class="cancel-btn db-btn" @click="handlerCancel">取消</view>
        <view class="save-btn db-btn" @click="handlerSubmit">确定</view>
      </view>
      <fui-cascader ref="cascader" :options="treeList" :value="cascaderValue" @complete="calendarComplete" />
    </fui-bottom-popup>
  </view>
</template>

<script>
  import DbInput from '../db-input/index.vue'
  import DbButton from '../db-button/index.vue'

  export default {
    name: 'DbCalendarPicker',
    components: {
      DbInput,
      DbButton,
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [Array, String],
        default: '',
      },
      // value=>value, label=>text, id=>id, pid=>pid的列表结构
      // 最父级的pid必须为0
      optionList: {
        type: Array,
        default: () => [],
      },
      rootId: {
        type: [String, Number],
        default: 0,
      },
      arrow: {
        type: Boolean,
        default: true,
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
      // 双向绑定的value值，1：当前选择的值全部返回 2：只返回最末级的code值
      type: {
        type: [Number, String],
        default: 2,
      },
      // 文字显示方式
      showTextType: {
        type: [String, Number],
        default: 1, // 1: 用'/'连接显示全部 2: 只显示末级
      },
      // 是否必须选择到最末级, true: 必须选择到末级 false: 可以不用选择末级
      mustBeLast: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        cascaderValue: [],
        visible: false,
      }
    },
    computed: {
      inputText: function () {
        const { value, optionList, type, showTextType } = this
        if (type == 1) {
          if (_.isArray(value) && value.length && _.isArray(optionList) && optionList.length) {
            let nameArr = []
            value.map((item) => {
              const selected = _.find(optionList, (dataItem) => dataItem.value == item)
              if (selected) {
                nameArr.push(selected.text)
              }
            })
            if (showTextType == 2) return nameArr[nameArr.length - 1]
            return nameArr.join('/')
          }
          return ''
        }
        if (type == 2) {
          if (!value) return ''
          const selectedAll = this.lastCodeFindAll(this.value)
          if (showTextType == 2) return selectedAll[selectedAll.length - 1]?.text
          return selectedAll.map((item) => item.text).join('/')
        }
        return ''
      },
      treeList: function () {
        const { optionList } = this
        if (_.isArray(optionList)) {
          const result = this.$t.arrayToTree(optionList)
          return result
        }
        return []
      },
    },
    watch: {
      value: {
        immediate: true,
        handler(newValue, oldValue) {
          if (this.type == 1) {
            this.cascaderValue = newValue || []
          }
          if (this.type == 2) {
            const selectedAll = this.lastCodeFindAll(newValue)
            this.cascaderValue = selectedAll.map((item) => item.value)
          }
        },
      },
    },
    methods: {
      handlerInput() {
        if (this.disabled) return
        this.visible = true
      },
      // 根据code查找本级及所有上级信息
      lastCodeFindAll(value) {
        const { optionList } = this
        let result = []
        if (!value && value !== 0) return []
        const findParent = (id, result = []) => {
          if (id == this.rootId) return result
          const selected = _.find(optionList, ['id', id])
          if (selected) {
            result.unshift(selected)
            return findParent(selected.pid, result)
          } else {
            return result
          }
        }
        const valueItem = _.find(optionList, ['value', value])
        if (valueItem) {
          result = findParent(valueItem.id)
        }
        return result
      },
      // 关闭
      handlerClose() {
        this.visible = false
      },
      handlerCancel() {
        this.handlerClose()
      },
      handlerSubmit() {
        console.log('--------> cascaderValue : ', this.cascaderValue)
        this.$refs.cascader.end()
      },
      // 完成
      calendarComplete(data) {
        const value = data.value.filter((item) => item)
        this.handlerClose()
        if (this.type == 1) {
          this.$emit('change', value)
        }
        if (this.type == 2) {
          this.$emit('change', value[value.length - 1])
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26rpx 30rpx 10rpx;

    .save-btn {
      color: $uni-color-primary;
    }

    .cancel-btn {
      color: $uni-text-color-placeholder;
    }
  }
</style>
