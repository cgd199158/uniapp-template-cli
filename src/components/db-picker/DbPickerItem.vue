<template>
  <view class="db-pickerItem">
    <view class="db-pickerItem__wrap db-btn-white">
      <view class="db-pickerItem__left">
        <fui-icon v-if="getChecked()" color="#1087DD" name="checkbox-fill" size="46" />
        <fui-icon v-else color="#ccc" name="checkround" size="46" />
      </view>
      <view class="db-pickerItem__right">
        <view v-if="config.titleProp" class="db-pickerItem__title">{{ getTitleText() }}</view>
        <view class="db-pickerItem__info">
          <!-- <db-info-list :data="data" :options="config.options"></db-info-list> -->
          <view class="db-infoList">
            <template>
              <template v-for="item in config.options || []">
                <view v-if="getValue(item)" :key="item.prop" class="db-infoList__item">
                  <view class="db-infoList__item__label" :style="{ flex: `0 0 ${labelWidth}rpx` }">{{ item.label }}</view>
                  <view class="db-infoList__item__lsymbol">：</view>
                  <view v-if="item.type" class="db-infoList__item__value">
                    <!-- 事前审批单 -->
                    <view v-if="item.type === 'prereport'" @click="handlerJumpApproval">
                      <span style="color: #1087dd">{{ data[item.prop] }}</span>
                    </view>
                    <!-- 多事前审批 -->
                    <template v-for="item in data.approvalNo" v-else-if="item.type === 'prereportMultiple'">
                      <view @click="handlerJumpApproval(item.sano)">
                        <span style="color: #1087dd">{{ item.title }}</span>
                      </view>
                    </template>
                    <component :is="item.type" v-else v-model="data[item.prop]" v-bind="item.options" />
                  </view>
                  <view v-else class="db-infoList__item__value" v-html="getValue(item)" />
                </view>
              </template>
            </template>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      selectedList: {
        type: Array,
      },
      // {
      // 	titleProp: 'name', // 标题prop
      // 	options: [], // 列表信息
      // }
      config: {
        type: Object,
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
      handlerToggle() {
        // this.data.selected = !this.data.selected
        this.$set(this.data, 'selected', !this.data.selected)
      },
      // 获取标题信息
      getTitleText() {
        const { titleProp } = this.config
        if (titleProp) {
          return this.$t.getValueBySafe(this.data, titleProp, '')
        }
        return ''
      },
      getChecked() {
        const { selectedList } = this
        if (_.isArray(selectedList)) {
          const index = _.findIndex(selectedList, (item) => item.value == this.data.value)
          if (index !== -1) {
            return true
          }
        }
        return false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-pickerItem {
    padding: 0 24rpx;
    margin-bottom: 20rpx;

    &__wrap {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24rpx 24rpx 24rpx 0;
      border-radius: 8rpx;
    }

    &__left {
      flex: 0 0 100rpx;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__right {
      flex: 1;
    }

    &__title {
      font-size: 32rpx;
      font-weight: bold;
    }
  }

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
