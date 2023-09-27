<template>
  <view class="db-table-box">
    <table class="db-table">
      <thead>
        <tr>
          <th v-for="(item, index) in columns" :key="index" :style="item.headerStyle" :width="`${item.width || '110px'}`">
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in dataList" :key="rowIndex">
          <td v-for="(column, columnIndex) in columns" :key="`${rowIndex}-${columnIndex}`">
            <view class="db-table-cell" :style="column.style">
              <template v-if="column.type === 'index'">{{ rowIndex + 1 }}</template>
              <template v-else-if="column.type === 'slot'">
                <slot :columnIndex="columnIndex" :name="column.prop" :row="row" :rowIndex="rowIndex"></slot>
              </template>
              <template v-else-if="column.type === 'money'">{{ $t.toMoney(getCellValue(row, column, rowIndex)) }}</template>
              <template v-else>
                {{ getCellValue(row, column, rowIndex) }}
              </template>
            </view>
          </td>
        </tr>
      </tbody>
      <slot name="footer"></slot>
    </table>
  </view>
</template>

<script>
  export default {
    name: 'DbTable',
    props: {
      dataList: {
        type: Array,
        default: () => [],
      },
      columns: {
        type: Array,
        defalt: () => [],
      },
    },
    data() {
      return {}
    },
    methods: {
      getCellValue(row, column) {
        const { prop, format } = column
        const value = row[prop]
        if (format) {
          if (_.isFunction(format)) {
            return format(value, row)
          }
          if (_.isString(format)) {
            const fun = new Function('value', 'row', 'column', format)
            return fun.call(this, value, row, column)
          }
        }
        return value
      },
    },
  }
</script>

<style lang="scss" scoped>
  .db-table-box {
    min-width: 100%;
    overflow-y: hidden;
    overflow-x: atuo;
  }
</style>
