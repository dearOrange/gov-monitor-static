import { GET, POST } from '@/api'

// 企业信息数据
function getBaBiz(params) {
  return GET('homePageData/getBaBizUnitList.do', params)
}
// 仓库信息数据
function getBaStock(params) {
  return GET('homePageData/getBaStockList.do', params)
}
// 车辆地图
function getBaCar(params) {
  return GET('homePageData/getBaCarList.do', params)
}
export default {
  getBaBiz,
  getBaStock,
  getBaCar
}
