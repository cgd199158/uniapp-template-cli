<template>
  <view class="db-userOrg">
    <db-select
      v-model="orgValue"
      :arrow="optionList.length > 1"
      :disabled="optionList.length === 1"
      :optionList="optionList"
      @change="orgChange"
      @submit="onSubmit"
    />
  </view>
</template>

<script>
  import DbSelect from '../db-select/index.vue'
  import { reqDeptsByUserId } from '@/apis/sys.js'

  import { mapState } from 'vuex'
  export default {
    name: 'DbUserOrg',
    components: {
      DbSelect,
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
      onChange: {
        type: Function,
      },
      type: {
        type: String,
        default: 'self', // self: 当前用户所在组织, id: 根据id查询当前用户所在党组织
      },
      // 用户id
      userId: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        orgValue: '',
        userOrgList: [], // 其他用户的列表
      }
    },
    computed: {
      ...mapState(['userInfo']),
      optionList: function () {
        const { userInfo = {}, type, userOrgList } = this
        const { orgs = [] } = userInfo
        if (type === 'self') {
          const orgList = orgs.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }))
          const defaultValue = orgList[0] && orgList[0].id
          const materItem = _.find(orgList, ['isMaster', 1]) || orgList[0]
          if (materItem) {
            if (!this.value) {
              this.orgValue = materItem.id
              this.$emit('change', materItem.id)
              if (_.isFunction(this.onChange)) {
                this.onChange(materItem)
              }
            }
          }

          return orgList
        } else {
          return this.userOrgList
        }
      },
    },
    watch: {
      value: {
        immediate: true,
        handler: function (newValue) {
          this.orgValue = newValue
        },
      },
      userId: {
        immediate: true,
        handler: function (newValue) {
          if (!newValue) return
          this.getUserOrgList(newValue)
        },
      },
    },
    methods: {
      orgChange(val) {
        this.$emit('change', val)
      },
      // 根据用户id获取组织机构
      getUserOrgList(userId) {
        reqDeptsByUserId({ id: userId }).then((res) => {
          if (res.code === 1) {
            const data = res.data.map((item) => ({
              ...item,
              value: item.id,
              label: item.name,
            }))
            this.userOrgList = data
            const materItem = _.find(data, ['isMaster', 1]) || data[0]
            if (materItem) {
              this.orgValue = materItem.value
              this.$emit('change', materItem.value)
              if (_.isFunction(this.onChange)) {
                this.onChange(materItem)
              }
            } else {
              this.$emit('change', '')
              if (_.isFunction(this.onChange)) {
                this.onChange('')
              }
            }
          }
        })
      },
      onSubmit(data) {
        this.$emit('submit', data)
        if (_.isFunction(this.onChange)) {
          this.onChange(data || {})
        }
      },
    },
  }
</script>

<style></style>
