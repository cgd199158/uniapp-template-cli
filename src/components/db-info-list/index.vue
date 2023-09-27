<template>
  <view class="db-infoList">
    <template>
      <template v-for="item in options">
        <view v-if="getValue(item)" :key="item.prop" class="db-infoList__item">
          <view class="db-infoList__item__label" :style="{ flex: `0 0 ${labelWidth}rpx` }">{{ item.label }}</view>
          <view class="db-infoList__item__lsymbol">：</view>
          <view v-if="item.type" class="db-infoList__item__value">
            <!-- 事前审批单 -->
            <view v-if="item.type === 'prereport'" @click="handlerJumpApproval">
              <span style="color: #1087dd">{{ data[item.prop] }}</span>
            </view>
            <component :is="item.type" v-else v-model="data[item.prop]" v-bind="item.options" />
          </view>
          <view v-else class="db-infoList__item__value" v-html="getValue(item)" />
        </view>
      </template>
    </template>
  </view>
</template>

<script>
  import dayjs from 'dayjs'
  import DbInput from '../db-input/index.vue'
  import DbTextarea from '../db-textarea/index.vue'
  import DbSelect from '../db-select/index.vue'
  import DbUserOrg from '../db-user-org/index.vue'
  import DbPicker from '../db-picker/index.vue'
  import DbUpload from '../db-upload/index.vue'
  import DbFiles from '../db-files/index.vue'
  import DbYesOrNo from '../db-yes-or-no/index.vue'
  export default {
    name: 'DbInfoList',
    components: {
      DbInput,
      DbTextarea,
      DbSelect,
      DbUserOrg,
      DbPicker,
      DbUpload,
      DbFiles,
      DbYesOrNo,
    },
    props: {
      // 数据源
      data: {
        type: Object,
        default: () => ({}),
      },
      // 配置信息
      options: {
        type: Array,
        default: () => [],
      },
      labelWidth: {
        type: [String, Number],
        default: 114,
      },
    },
    data() {
      return {}
    },
    methods: {
      // 获取对用的值
      getValue(item) {
        const { data } = this
        if (item.format) {
          const _this = this
          const value = this.$t.getValueBySafe(data, item.prop)
          if (_.isFunction(item.format)) {
            return item.format(value)
          }
          try {
            const format = new Function('dayjs', 'value', 'item', 'data', '_this', item.format)
            return format.call(this, dayjs, value, item, data, _this)
          } catch (error) {
            console.log('--------> error : ', error)
          }
        }
        const result = this.$t.getValueBySafe(data, item.prop)
        return result
      },
      // 关联事前审批的跳转
      handlerJumpApproval() {
        const { data } = this
        this.$Router.push({
          path: '/pages/workflowView/index',
          query: {
            moduleNo: data.approvalModuleno,
            sano: data.approvalNo,
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-infoList {
    font-size: 28rpx;
    font-weight: normal;
    line-height: 1.8;
    position: relative;

    .db-infoList__item {
      display: flex;
      align-items: flex-start;
      color: $uni-text-color-placeholder;

      &__label {
        flex: 0 0 114rpx;
        text-align: right;
        text-align-last: justify;
      }

      &__symbol {
        flex: 0;
        flex-shrink: 0;
      }

      &__value {
        flex: 1;
        color: $uni-text-color-grey;
        word-break: break-all;

        ::v-deep .db-files__item {
          justify-content: flex-start;
          align-items: center;
          padding: 2px 0;

          margin-top: 0;
        }
      }
    }
  }
</style>
