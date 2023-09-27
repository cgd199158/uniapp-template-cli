<template>
  <view :class="['db-form', { 'db-form--right': align === 'right' }]">
    <fui-form ref="form" :show="showTip">
      <template v-for="item in widgetList">
        <!-- 模块标题 -->
        <view v-if="item.type === 'title' && getVisible(item)" :key="item.prop" class="form-title">{{ item.label }}</view>
        <template v-else>
          <db-form-item
            v-if="getVisible(item)"
            :key="item.prop"
            :arrow="item.arrow"
            :label="item.label"
            :labelWidth="labelWidth"
            :required="item.required"
            :style="item.style"
          >
            <!-- 左侧label -->
            <template #left>
              <view @click="handlerTip(item)">
                {{ item.label }}
                <fui-icon v-if="item.tip" color="#999" name="info" size="32rpx" style="margin-left: 4rpx" />
                :
              </view>
            </template>
            <!-- 内容区 -->
            <template v-if="item.type === 'slot'" #default>
              <slot :name="`${item.prop}Slot`"></slot>
            </template>
            <template v-if="item.type !== 'slot'">
              <!-- 没有数据嵌套 -->
              <component
                :is="item.type"
                v-if="item.prop.indexOf('.') === -1"
                v-bind="item.options || {}"
                v-model="formData[item.prop]"
                :placeholder="getPlaceholder(item)"
              />
              <template v-else>
                <!-- 多级数据切套 -->
                <component
                  :is="item.type"
                  v-if="item.prop.split('.').length == 2"
                  v-bind="item.options || {}"
                  v-model="formData[item.prop.split('.')[0]][item.prop.split('.')[1]]"
                  :placeholder="getPlaceholder(item)"
                />
                <component
                  :is="item.type"
                  v-if="item.prop.split('.').length == 3"
                  v-bind="item.options || {}"
                  v-model="formData[item.prop.split('.')[0]][item.prop.split('.')[1]][item.prop.split('.')[2]]"
                  :placeholder="getPlaceholder(item)"
                />
              </template>
            </template>

            <template #right>
              <view v-if="item.appendText" class="rightSlot-box">
                <fui-text :size="28" :text="item.appendText" type="primary" @click="handlerApped(item)" />
              </view>
            </template>
          </db-form-item>
        </template>
      </template>
    </fui-form>
    <view v-if="showFooter" class="db-form__btns">
      <fui-button color="#1087DD" text="重置" type="gray" @click="reset" />
      <fui-button bold :text="submitText" @click="submit" />
    </view>
  </view>
</template>

<script>
  import DbInput from '../db-input/index.vue'
  import DbTextarea from '../db-textarea/index.vue'
  import DbSelect from '../db-select/index.vue'
  import DbUserOrg from '../db-user-org/index.vue'
  import DbPicker from '../db-picker/index.vue'
  import DbUpload from '../db-upload/index.vue'
  import DbFiles from '../db-files/index.vue'
  import DbDatePicker from '../db-date-picker/index.vue'
  import DbCalendarPicker from '../db-calendar-picker/index.vue'
  import DbInputNumber from '../db-input-number/index.vue'
  import DbCreaterName from '../db-creater-name/index.vue'
  import DbUserPicker from '../db-user-picker/index.vue'
  import DbBudgetPicker from '../db-budget-picker/index.vue' // 预算选择
  import DbRadioGroup from '../db-radio-group/index.vue' // 单选
  import DbPrereportPicker from '../db-prereport-picker/index.vue' // 选择事前审批单
  import DbPayee from '../db-payee/index.vue' // 选择事前审批单
  import DbCascaderPicker from '../db-cascader-picker/index.vue' // 级联选择
  import DbCityPicker from '../db-city-picker/index.vue' // 城市选择
  import DbCheckboxGroup from '../db-checkbox-group/index.vue'
  import DbOrgPicker from '../db-org-picker/index.vue' // 组织机构选择
  import DbText from '../db-text/index.vue' // 组织机构选择
  import DbSupplierSelect from '../db-supplier-select/index.vue' // 租车服务商
  import DbTreePicker from '../db-tree-picker/index.vue' // 租车服务商

  export default {
    components: {
      DbInput,
      DbTextarea,
      DbSelect,
      DbUserOrg,
      DbPicker,
      DbUpload,
      DbFiles,
      DbDatePicker,
      DbCalendarPicker,
      DbInputNumber,
      DbCreaterName,
      DbUserPicker,
      DbBudgetPicker,
      DbRadioGroup,
      DbPrereportPicker,
      DbPayee,
      DbCascaderPicker,
      DbCityPicker,
      DbCheckboxGroup,
      DbOrgPicker,
      DbText,
      DbSupplierSelect,
      DbTreePicker,
    },
    props: {
      widgetList: {
        type: Array,
        default: () => [],
        required: true,
      },
      formData: {
        type: Object,
        default: () => ({}),
      },
      rules: {
        type: Array,
        default: () => [],
      },
      labelWidth: {
        type: Number,
        default: 170,
      },
      align: {
        type: String,
        default: 'left',
      },
      // 是否显示提交按钮
      showFooter: {
        type: Boolean,
        default: true,
      },
      // 是否在表单上面显示错误提示
      showTip: {
        type: Boolean,
        default: true,
      },
      // 提交按钮显示文字
      submitText: {
        type: String,
        default: '提交',
      },
    },
    data() {
      return {
        defaultData: {},
      }
    },
    computed: {
      // 处理之后的规则
      afterRuels: function () {
        const { rules = [], widgetList } = this
        let newRules = [...rules]
        if (_.isArray(widgetList)) {
          widgetList.map((item) => {
            // 如果必填存在则规则也添加必填
            if (item.required) {
              if (Object.prototype.hasOwnProperty.call(item, 'isVisible')) {
                if (_.isFunction(item.isVisible)) {
                  if (item.isVisible()) {
                    newRules.push({
                      name: item.prop,
                      rule: ['required'],
                      msg: [`请输入${item.label}`],
                    })
                  }
                } else {
                  if (item.isVisible) {
                    newRules.push({
                      name: item.prop,
                      rule: ['required'],
                      msg: [`请输入${item.label}`],
                    })
                  }
                }
              } else {
                newRules.push({
                  name: item.prop,
                  rule: ['required'],
                  msg: [`请输入${item.label}`],
                })
              }
            }
            if (item.rules) {
              if (Object.prototype.hasOwnProperty.call(item, 'isVisible')) {
                if (_.isFunction(item.isVisible)) {
                  if (!item.isVisible()) {
                    return
                  }
                } else {
                  if (!item.isVisible) {
                    return
                  }
                }
              }
              if (_.isArray(item.rules)) {
                newRules = [...newRules, ...item.rules]
              } else if (_.isString(item.rules)) {
                // 这里对string类型的验证做特殊处理
              } else {
                consolelog('没有规则')
              }
            }
          })
        }
        return newRules
      },
    },
    mounted() {
      this.defaultData = _.cloneDeep(this.formData)
    },
    methods: {
      // 点击提示
      handlerTip(data) {
        if (data.tip) {
          this.$t.toast(`${data.label}：${data.tip}`)
        }
      },
      // 点击后侧内容
      handlerApped(data) {
        if (_.isFunction(data.onAppend)) {
          data.onAppend()
        }
        this.$emit('apped')
      },
      // 提交
      submit() {
        const { afterRuels } = this
        this.$refs.form
          .validator(this.formData, afterRuels, true)
          .then((res) => {
            if (res.isPassed) {
              this.$emit('submit', this.formData)
            } else {
              // console.log('--------> res.errorMsg : ', res.errorMsg)
              // this.$t.toast(res.errorMsg.map((item) => item.msg).join(','), {
              //   duration: 3000,
              // })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 手动提交
      doSubmit(tip = true) {
        return new Promise((resolve, reject) => {
          const { afterRuels } = this
          this.$refs.form
            .validator(this.formData, afterRuels, true)
            .then((res) => {
              if (res.isPassed) {
                resolve({ code: 1, data: { formData: this.formData } })
              } else {
                const msg = res.errorMsg.map((item) => item.msg).join(',')
                resolve({ code: 0, data: { msg: msg, formData: this.formData } })
                if (tip) {
                  this.$t.toast(msg, {
                    duration: 3000,
                  })
                }
              }
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        })
      },
      // 处理placeholder
      getPlaceholder(data) {
        if (data.options && data.options.placeholder) return data.options.placeholder
        const inputList = ['DbInput', 'DbInputNumber']
        return `${inputList.indexOf(data.type) !== -1 ? '请输入' : '请选择'}${data.label}`
      },
      // 获取visible
      getVisible(data) {
        // 1. 判断是否有visible属性
        if (Object.prototype.hasOwnProperty.call(data, 'isVisible')) {
          if (_.isFunction(data.isVisible)) {
            return data.isVisible()
          } else {
            return data.isVisible || data.isVisible === 0
          }
        }
        return true
      },
      // 重置
      reset() {
        const { defaultData } = this
        for (let key in defaultData) {
          this.formData[key] = defaultData[key]
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-form {
    &__btns {
      padding: 0 32rpx;
      margin-top: 40rpx;
      margin-bottom: 80rpx;
      display: flex;

      ::v-deep .fui-button__wrap + .fui-button__wrap {
        margin-left: 30rpx !important;
      }
    }

    ::v-deep .form-title {
      padding: 20rpx 20rpx;
      font-size: 30rpx;
      color: $uni-text-color-grey;
    }

    ::v-deep .fui-form__item-wrap {
      align-items: flex-start;
    }

    ::v-deep .fui-form__asterisk {
      top: 44rpx;
      line-height: 42rpx;
    }

    ::v-deep .fui-form__item-arrow {
      height: 26rpx;
      width: 26rpx;
    }
  }

  .db-form--right {
    ::v-deep .uni-input-input,
    .uni-input-placeholder {
      text-align: right;
    }
  }

  .rightSlot-box {
    padding-left: 20rpx;
    max-width: 50%;
  }
</style>
