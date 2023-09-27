<template>
  <view class="db-yesOrNo">
    <text v-if="value" class="db-yesOrNo--yes">{{ text[1] }}</text>
    <text v-else class="db-yesOrNo--no">{{ text[0] }}</text>
  </view>
</template>

<script>
  export default {
    name: 'DbYesOrNo',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: [Boolean, Number, String],
      },
      text: {
        type: [Array],
        default: () => ['否', '是'],
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .db-yesOrNo {
    display: inline-flex;
    &--yes {
      color: $uni-color-success;
    }

    &--no {
      color: $uni-color-error;
    }
  }
</style>
