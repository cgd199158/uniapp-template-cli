<template>
  <view class="db-select">
    <db-input :arrow="arrow" disabled :placeholder="placeholder" :value="inputText" @click.native="handlerInput" />
    <fui-date-picker
      :maxDate="maxDate"
      :minDate="minDate"
      :range="['datetimerange', 'daterange'].indexOf(type) !== -1"
      :show="visible"
      :title="title"
      :type="datetimeMap[type] || 3"
      :value="toValue"
      @cancel="handlerClose"
      @change="handlerSubmit"
    />
  </view>
</template>

<script>
  import dayjs from 'dayjs'
  import DbInput from '../db-input/index.vue'

  const datetimeMap = {
    year: 1,
    month: 2,
    date: 3,
    datetime: 5,
    datetimerange: 5,
    daterange: 3,
    hour: 6, // 时分
  }

  const defaultValueType = ['year', 'month', 'hour']

  export default {
    name: 'DbDatePicker',
    components: {
      DbInput,
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      title: {
        type: String,
        default: '请选择',
      },
      value: {
        type: [String, Number, null],
        default: '',
      },
      type: {
        type: String,
        default: 'date', // year: 选择年, month: 选择月, date: 选择年月日, datetime: 选择年月日时分, datetimerange, daterange
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
      },
    },
    data() {
      return {
        datetimeMap,
        visible: false,
      }
    },
    computed: {
      toValue: function () {
        const { value, showFormat, type } = this
        if (defaultValueType.indexOf(type) !== -1) {
          return value
        }
        if (!value) return dayjs().format(showFormat) // 默认显示当天
        if (_.isNumber(value)) {
          return dayjs(value * 1000).format(showFormat)
        }
        return dayjs(value).format(showFormat)
      },
      inputText: function () {
        const { value, showFormat, type } = this
        if (!value) return ''
        if (defaultValueType.indexOf(type) !== -1) {
          return value
        }
        if (_.isNumber(value)) {
          return dayjs(value * 1000).format(showFormat)
        }
        return dayjs(value).format(showFormat)
      },
    },
    methods: {
      handlerInput() {
        if (this.disabled) return
        this.visible = true
      },
      // 点击提交
      handlerSubmit(data) {
        console.log('--------> data : ', data)
        let result = data.result
        if (this.type === 'year') {
          result = String(result)
        }
        this.$emit('change', result)
        this.$emit('submit', data)
        if (_.isFunction(this.onChange)) {
          this.onChange(result)
        }
        this.handlerClose()
      },
      // 关闭
      handlerClose() {
        this.visible = false
      },
    },
  }
</script>

<style></style>
