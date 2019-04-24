import { GET, POST } from '@/api'

// 30天库存数量
function getStockMon(params) {
  return GET('homePageData/getStockMonitorDataListByDate.do', params)
}

// 30天地区出货
function getAreaCate(params) {
  return GET('homePageData/getAreaSalesDataListByAreaAndCategory.do', params)
}

// 30天地区收货
function getArea(params) {
  return GET('homePageData/getAreaSalesDataListByArea.do', params)
}

export default {
  getStockMon,
  getAreaCate,
  getArea
}
