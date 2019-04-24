<template>
  <div id="main_container">
    <Header :isShow="isShow" @fetchSetting="fetchSetting"/>
    <div class="section content">
      <div class="lt">
        <ewv-mix :data="data"></ewv-mix>
        <rate-mix :data="data"></rate-mix>
      </div>
      <div class="md">
        <e-map/>
      </div>
      <div class="rt" @click="gotoCarinfo()">
        <trend></trend>
        <trend-two></trend-two>
        <kinds :data="data"></kinds>
      </div>

      <!-- <LeftNav :orgNum="orgNum"  :orgMonitorNum="orgMonitorNum" :stockNum="stockNum" :stockMonitorNum="stockMonitorNum" :stockTotalAcreage="stockTotalAcreage"  :carNum="carNum" :carMonitorNum="carMonitorNum" :carOnlineTotal="carOnlineTotal" :tracePercent="tracePercent" :tempReachPercent="tempReachPercent" class="left"/>
      <MapContainer class="mid"/>
      <EchartsContainer v-if="hasLoadData" :monthlyOutput="monthlyOutput"  :averageDailyShipments="averageDailyShipments" :biMonitorNum="biMonitorNum" :biMonitorDatas="biMonitorDatas"  :biCategoryDatas="biCategoryDatas" class="right"/>-->
    </div>
  </div>
</template>

<script>
import Header from '@components/common/header'

import EwvMix from '@components/home/ewv-mix'
import RateMix from '@components/home/rate-mix'

import EMap from '@components/home/map2'

import Trend from '@components/home/trend'
import TrendTwo from '@components/home/trend2'
import Kinds from '@components/home/kinds'
import Dialog from '@components/common/dialog'
import Settings from '@components/common/settings'
import { fmtDate } from '@utils/date'
import homeApi from '@/api/home'

export default {
  name: 'Main',
  components: {
    Header,
    EwvMix,
    RateMix,
    Trend,
    TrendTwo,
    Kinds,
    EMap
  },
  data() {
    return {
      data: {},
      isShow: true
    }
  },
  mounted() {
    homeApi.fetchAllData().then(({ success, data: { data } }) => {
      if (success) {
        // let biMonitorDatas = data.biMonitorDatas.map((ele, index, ele2) => {
        //   return fmtDate(ele.bizDate)
        // })
        // let biMonitorNum = data.biMonitorDatas.map(ele => {
        //   return ele.shipmentWeight
        // })
        let biCategoryDatas = []
        if (data.biCategoryDatas.length !== 0) {
          let biTotal = data.biCategoryDatas[0].total
          biCategoryDatas = data.biCategoryDatas.map((ele, index, ele2) => {
            let percentage = (ele.total / biTotal).toFixed(2) * 100
            return { ...ele, percentage }
          })
        }
        // let bizDate = data.biStockMonitorDataList.map(ele => {
        //   return fmtDate(ele.bizDate)
        // })
        // let transactionAmount = data.biStockMonitorDataList.map(ele => {
        //   return ele.transactionAmount
        // })
        this.data = {
          ...data,
          // biMonitorDatas,
          // biMonitorNum,
          biCategoryDatas
          // bizDate,
          // transactionAmount
        }

        // 测试用
        // this.data.tracePercent = 50
        // this.data.tempReachPercent = 75
      }
    })
  },
  methods: {
    gotoCarinfo() {
      this.$router.push('/carinfo')
    },
    fetchSetting(value) {
      Dialog.open(Settings, {
        props: {
          value
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  padding: 15px;
  .lt {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .md {
    width: 50%;
  }
  .rt {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }
}

// #main_container {
//   width: 100%;
//   height: 100%;
//   background: rgba(9, 14, 34, 1);
//   .section {
//     width: 100%;
//     height: 90%;
//     padding: 15px;
//     display: -webkit-flex;
//     display: flex;
//     .left {
//       width: 25%;
//     }
//     .mid {
//       width: 50%;
//     }
//     .right {
//       width: 25%;
//     }
//   }
// }
</style>
