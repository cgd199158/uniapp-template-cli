import http from '@/uni_modules/firstui/fui-request'

// 登录
export function reqLogin(data) {
  return http.post('/sys/auth/auth/login', {
    data: data,
  })
}

// 退出登录
export function reqLogout(data) {
  return http.post('/sys/auth/auth/logout', {
    data: data,
  })
}

// 企业微信登录
export function reqQyWechatLogin(data) {
  return http.post('/qywechat/auth/login', {
    data: data,
  })
}

// 钉钉登录
export function reqDDLogin(data) {
  return http.post('/dtalk/auth/login', {
    data: data,
  })
}

// 获取用户信息
export function reqUserInfo(data) {
  return http.post('/sys/auth/auth/getUserInfo', {
    data: data,
  })
}

// 获取首页菜单
export function reqHomeMenu(data) {
  return http.post('/app/index', {
    data: data,
  })
}

// 获取全局配置信息
export function reqDbSetting(data) {
  return http.post('/sys/setting/get', {
    data: data,
  })
}

// 获取所有用户信息
export function reqAllUserList(data) {
  return http.post('/sys/auth/user/selectlist', {
    data: data,
  })
}

// 根据用户id获取用户科室
export function reqDeptsByUserId(data) {
  return http.post('/sys/auth/user/getUserDepts', {
    data: data,
  })
}

// 获取用户关联的账套信息
export function reqBudgetBook(data) {
  return http.post('/budget/book/getList', {
    data: data,
  })
}

// 获取字典列表
export function reqDictList(data) {
  return http.post('/sys/dictionary/dictionary/getalllist', {
    data: data,
  })
}

// 上传打印模板
export function reqUploadPrintTemplate(data) {
  return http.post('/base/tool/uploadprinthtml', {
    data: data,
  })
}

// 获取打印模板数据(后端处理数据)(事前审批)
export function reqPrintDataByPrereport(data) {
  return http.post('/expense/prereport/getprint', {
    data: data,
  })
}

// 获取打印模板数据(后端处理数据)(报销)
export function reqPrintDataByExpense(data) {
  return http.post('/expense/expense/getprint', {
    data: data,
  })
}

// 获取城市列表
export function reqCityList(data) {
  return http.post('/sys/city/getList', {
    data: data,
  })
}

// 获取交通工具列表
export function reqVehicleList(data) {
  return http.post('/base/vehicle/getList', {
    data: data,
  })
}

// 获取规则信息(通用)
export function reqEngine(data) {
  return http.post('/rules/engine/engine/getmatchedrule', {
    data: data,
  })
}

// 获取规则信息(显示用)
export function reqGetRuleShow(data) {
  return http.post('/rules/engine/engine/getMatchedData', {
    data: data,
  })
}

// 获取组织机构列表
export function reqOrgList(data) {
  return http.post('/sys/org/org/getList', {
    data: data,
  })
}

// 获取天数（选择开始时间和结束时间）
export function reqDaysByDateTimeRange(data) {
  return http.post('/base/days/getcardays', {
    data: data,
  })
}

// 获取车辆类型
export function reqCarTypeList(data) {
  return http.post('/base/cartype/getlist', {
    data: data,
  })
}

// 租车服务商
export function reqCarSupplierList(data) {
  return http.post('/base/carsupplier/getList', {
    data: data,
  })
}
