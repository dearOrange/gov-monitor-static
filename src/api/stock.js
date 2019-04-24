import { GET } from '@/api'

export function fetchAllData(params = {}) {
  return GET('homePageData/getHomeStockDataByShipment.do', params)
}
