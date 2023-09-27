<template>
  <view class="db-select">
    <db-input :arrow="arrow" disabled :placeholder="placeholder" :value="inputText" @click.native="handlerInput" />
    <fui-picker linkage :options="showOptions" :show="visible" :value="inputText" @cancel="handlerClose" @change="handlerSubmit" />
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import DbInput from '../db-input/index.vue'
  export default {
    name: 'DbSelect',
    components: {
      DbInput,
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [String, Number, null],
        default: '',
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
      // 下拉数据
      optionList: {
        type: Array,
        default: () => [],
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
      onChange: {
        type: Function,
      },
      onSubmit: {
        type: Function,
      },
      type: {
        type: String,
        default: 'default', // default: 传统select  dict: 字典select
      },
      dictGroup: {
        type: String,
        default: '',
      },
      dictType: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        visible: false,
      }
    },
    computed: {
      ...mapState(['dictList']),
      inputText: function () {
        const { showOptions = [], value = '' } = this
        let result = ''
        if (_.isArray(showOptions)) {
          const item = _.find(showOptions, (item) => item.value == value)
          if (item) {
            result = item.label
          }
        }
        return result
      },
      showOptions: function () {
        const { type, dictGroup, dictType, dictList } = this
        if (type === 'dict') {
          if (dictGroup && dictType) {
            const list = dictList.filter((item) => item.groupid == dictGroup && item.name == dictType)
            const result = list.map((item) => ({ ...item, label: item.optLabel, text: item.optLabel, value: item.optValue }))
            return result
          }
          return []
        }
        const { optionList } = this
        if (_.isArray(optionList)) {
          return optionList.map((item) => ({
            ...item,
            text: item.label,
          }))
        }
        return []
      },
    },
    methods: {
      handlerInput() {
        if (this.disabled) return
        this.visible = true
      },
      // 点击提交
      handlerSubmit(data) {
        this.$emit('change', data.value)
        if (_.isFunction(this.onChange)) {
          this.onChange(data.value)
        }
        const selected = _.find(this.showOptions, (item) => item.value == data.value)
        if (selected) {
          this.$emit('submit', selected)
        } else {
          this.$emit('submit', '')
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
