import dayjs from 'dayjs'

// 测试过滤器
export function toUpperCase(arg) {
  return arg && arg.toUpperCase()
}

export function timestampToDate(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) return ''
  return dayjs(time * 1000).format(format)
}
