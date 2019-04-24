import { GET, POST } from '@/api'

function fetchAllData(params = {}) {
  return GET('homePageData/getHomePageData.do', params)
}

function getOrder(params = {}) {
  return GET('homePageData/getOrderLatestList.do', params)
}

export default {
  fetchAllData,
  getOrder
}
