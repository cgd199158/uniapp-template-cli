<template>
  <fui-empty v-bind="$attrs" color="#999" :isFixed="isFixed" :src="require('./img_data_3x.png')" :title="title" />
</template>

<script>
  export default {
    name: 'DbEmpty',
    props: {
      title: {
        type: String,
        default: '暂无相关数据~',
      },
      isFixed: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped></style>
