<template>
  <view class="db-select">
    <db-input :arrow="arrow" disabled :placeholder="placeholder" :value="inputText" @click.native="handlerInput" />
    <fui-bottom-popup :show="visible" @close="handlerClose">
      <view v-if="type == 2" class="popup-header">
        <view class="cancel-btn db-btn" @click="handlerCancelType2">取消</view>
        <view class="save-btn db-btn" @click="handlerSubmitType2">确定</view>
      </view>
      <fui-calendar :maxDate="maxDate" :minDate="minDate" showLunar :type="type" :value="value" @change="handlerSubmit" />
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
        type: [String, Number, Array],
        default: '',
      },
      type: {
        type: [String, Number],
        default: 1, // 1: 一个日期选择, 2: 多个日期选择, 3: 日期区间选择
      },
      placeholder: {
        type: String,
        default: '请选择',
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
      showFormat: {
        type: String,
        default: 'YYYY-MM-DD',
      },
      minDate: {
        type: String,
      },
      maxDate: {
        type: String,
      },
      onChange: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
        multipleValue: [],
        visible: false,
      }
    },
    computed: {
      inputText: function () {
        const { value, showFormat, type } = this
        if (!value) return ''
        if (type == 1) {
          return this.$t.formatTime(value, showFormat)
        }
        if (type == 2) {
          if (_.isArray(value)) {
            const times = value.map((item) => this.$t.formatTime(item, showFormat))
            return times.join(',')
          } else {
            return ''
          }
        }
        if (type == 3) {
          if (_.isArray(value) && value.length === 2) {
            const times = value.map((item) => this.$t.formatTime(item, showFormat))
            return `${times[0]}至${times[1]}`
          } else {
            return ''
          }
        }
        return ''
      },
    },
    methods: {
      handlerInput() {
        if (this.disabled) return
        this.visible = true
      },
      // 点击提交
      handlerSubmit(data) {
        const { type } = this
        if (type == 2) {
          this.multipleValue = data.value.filter((item) => item.indexOf('NaN') === -1)
        }
        if (type == 1 || type == 3) {
          this.$emit('change', data.value)
          this.$emit('submit', data.value)
          this.handlerClose()
          if (_.isFunction(this.onChange)) {
            this.onChange(data.value)
          }
        }
      },
      // 关闭
      handlerClose() {
        this.visible = false
      },
      // type=2 取消
      handlerCancelType2() {
        this.multipleValue = []
        this.handlerClose()
      },
      // type=3 确定
      handlerSubmitType2() {
        this.$emit('change', this.multipleValue)
        this.$emit('submit', this.multipleValue)
        this.handlerClose()
        if (_.isFunction(this.onChange)) {
          this.onChange(this.multipleValue)
        }
      },
      // 触发change事件
      calendarChange(data) {
        console.log('--------> data : ', data)
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
