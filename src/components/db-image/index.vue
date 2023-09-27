<template>
  <image v-bind="$attrs" :src="imgUrl" />
</template>

<script>
  export default {
    props: {
      src: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        imgUrl: '',
      }
    },
    watch: {
      src: {
        immediate: true,
        handler: function (newValue) {
          this.getImageUrl(newValue)
        },
      },
    },
    methods: {
      getImageUrl(fileId) {
        const url = this.$t.getFileViewUrl(fileId)
        uni.request({
          url: url, //请求文件流地址
          method: 'GET',
          responseType: 'arraybuffer',
          success: (res) => {
            let datas = res.data
            this.imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(datas).reduce((datas, byte) => datas + String.fromCharCode(byte), ''))
          },
          fail: () => {},
          complete: () => {},
        })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
