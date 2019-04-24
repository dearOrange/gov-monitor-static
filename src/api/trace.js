import { GET } from '@/api'

export function fetchAllData(params = {}) {
  return GET('homePageData/getHomeStockDataByTran.do', params)
}
