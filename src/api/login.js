import { GET, POST } from '@/api'

function login(params) {
  return POST('login/validate.do', params)
}

// 首页数据展示
function homePage(params) {
  return GET('homePageData/getHomePageData.do', params)
}

// 仓货车数据展示
function getTruck(params) {
  return GET('homePageData/getTruckData.do', params)
}

// 企业信息数据
function getBaBiz(params) {
  return GET('homePageData/getBaBizUnitList.do', params)
}

function logout() {
  return POST('login/logout.do')
}

// 仓货车数据展示
function getTruck(params) {
  return GET('homePageData/getTruckData.do', params)
}

// 企业信息数据
function getBaBiz(params) {
  return GET('homePageData/getBaBizUnitList.do', params)
}

//追溯达标率折线图
function getTraceBar(params) {
  return GET('homePageData/getTraceByDate.do', params)
}

//追溯达标率的30天数据
function getTrace(params) {
  return GET('homePageData/getTrace.do', params)
}

// 水球图
function getBiCate(params) {
  return GET('homePageData/getBiCategoryDataList.do', params)
}
export default {
  login,
  homePage,
  getTruck,
  getBaBiz,
  logout,
  getTrace,
  getTraceBar,
  getBiCate
}
