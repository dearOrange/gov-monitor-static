<template>
  <div id="main_container">
    <Header/>
    <div class="section">
      <LeftNav :orgNum="orgNum"  :orgMonitorNum="orgMonitorNum" :stockNum="stockNum" :stockMonitorNum="stockMonitorNum" :stockTotalAcreage="stockTotalAcreage"  :carNum="carNum" :carMonitorNum="carMonitorNum" :carOnlineTotal="carOnlineTotal" :tracePercent="tracePercent" :tempReachPercent="tempReachPercent" class="left"/>
      <MapContainer class="mid"/>
      <EchartsContainer v-if="hasLoadData" :monthlyOutput="monthlyOutput"  :averageDailyShipments="averageDailyShipments" :biMonitorNum="biMonitorNum" :biMonitorDatas="biMonitorDatas"  :biCategoryDatas="biCategoryDatas" class="right"/>
    </div>
  </div>
</template>

<script>
import Header from '@components/common/header'
import LeftNav from '@components/main/layout-left'
import MapContainer from '@components/main/echarts_map'
// import MapContainer from '@components/main/returnmap'
import EchartsContainer from '@components/main/echarts'
import { fmtDate } from '@utils/date'
import homeApi from '@/api/home'

export default {
  name: 'Main',
  components: {
    Header,
    LeftNav,
    MapContainer,
    EchartsContainer
  },
  data() {
    return {
      orgNum: '0', //企业总数
      orgMonitorNum: '0', //企业监控数量
      stockNum: '0', //仓库总数
      stockMonitorNum: '0', //仓库监控数量
      stockTotalAcreage: '0', //仓库总面积
      carNum: '0', //车辆总数
      carMonitorNum: '0', //类型：Number  必有字段  备注：车辆监控数量
      carOnlineTotal: '0', //类型：Number  必有字段  备注：车辆在线数量
      tracePercent: '70', //类型：Mixed  必有字段  备注：可溯源比例
      tempReachPercent: '70', //类型：Mixed  必有字段  备注：温控达标率
      biMonitorDatas: [], //类型：Array  必有字段  备注：30天的总出货量对象,
      biMonitorNum: [],
      biCategoryDatas: [], //类型：Array  必有字段  备注：商品大类30天数据,
      monthlyOutput: '0', //类型：Number  必有字段  备注：30天总出货量
      averageDailyShipments: '0',
      hasLoadData: false
    }
  },
  mounted() {
    //  let token = this.$local.fetch('loginMsg').token;
    //  if(token){
    //    this.$router.push('/main/home')
    //  }else{
    //    this.$router.push('/')
    //  }
    this.$ajax({
      method: 'get',
      url: this.$http + '/homePageData/getHomePageData.do',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      let data = res.data
      if (data.code === '0') {
        let dataNum = data.data
        this.monitorTitle = dataNum.monitorTitle
        this.fullName = dataNum.fullName
        this.orgNum = dataNum.orgNum.toFixed(0)
        this.orgMonitorNum = dataNum.orgMonitorNum.toFixed(0)
        this.stockNum = dataNum.stockNum.toFixed(0)
        this.stockMonitorNum = dataNum.stockMonitorNum.toFixed(0)
        this.stockTotalAcreage = dataNum.stockTotalAcreage.toFixed(0)
        this.carNum = dataNum.carNum.toFixed(0)
        this.carMonitorNum = dataNum.carMonitorNum.toFixed(0)
        this.carOnlineTotal = dataNum.carOnlineTotal.toFixed(0)
        this.tracePercent = dataNum.tracePercent
        this.tempReachPercent = dataNum.tempReachPercent
        this.monthlyOutput = dataNum.monthlyOutput.toFixed(0)
        this.averageDailyShipments = dataNum.averageDailyShipments.toFixed(0)
        // this.biCategoryDatas = dataNum.biCategoryDatas

        this.biMonitorDatas = dataNum.biMonitorDatas.map((ele, index, ele2) => {
          return fmtDate(ele.bizDate)
        })
        this.biMonitorNum = data.biMonitorDatas.map(ele => {
          return ele.shipmentWeight
        })
        var biTotal = data.biCategoryDatas[0].total
        this.biCategoryDatas = data.biCategoryDatas.map((ele, index, ele2) => {
          ele.percentage = (ele.total / biTotal).toFixed(2) * 100
          return ele
        })
        this.hasLoadData = true
      }
    })

    // this.$ajax({
    //   method: 'get',
    //   url: this.$http + '/homePageData/getHomePageData.do',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(res => {
    //   let data = res.data
    //   if (data.code === '0') {
    //     let dataNum = data.data
    //     this.monitorTitle = dataNum.monitorTitle
    //     this.fullName = dataNum.fullName
    //     this.orgNum = dataNum.orgNum
    //     this.orgMonitorNum = dataNum.orgMonitorNum
    //     this.stockNum = dataNum.stockNum
    //     this.stockMonitorNum = dataNum.stockMonitorNum
    //     this.stockTotalAcreage = dataNum.stockTotalAcreage
    //     this.carNum = dataNum.carNum
    //     this.carMonitorNum = dataNum.carMonitorNum
    //     this.carOnlineTotal = dataNum.carOnlineTotal
    //     this.tracePercent = dataNum.tracePercent
    //     this.tempReachPercent = dataNum.tempReachPercent
    //     this.monthlyOutput = dataNum.monthlyOutput
    //     this.averageDailyShipments = dataNum.averageDailyShipments
    //     // this.biCategoryDatas = dataNum.biCategoryDatas
    //     this.biMonitorDatas = dataNum.biMonitorDatas.map((ele, index, ele2) => {
    //       return fmtDate(ele.bizDate)
    //     })
    //     this.biMonitorNum = dataNum.biMonitorDatas.map(ele => {
    //       return ele.shipmentWeight
    //     })
    //     var biTotal = dataNum.biCategoryDatas[0].total
    //     this.biCategoryDatas = dataNum.biCategoryDatas.map(
    //       (ele, index, ele2) => {
    //         ele.percentage = (ele.total / biTotal).toFixed(2) * 100
    //         return ele
    //       }
    //     )
    //     this.hasLoadData = true
    //   } else if (data.code === '1002') {
    //     this.open(data.message, true)
    //   } else {
    //     this.open(data.message, false)
    //   }
    // })
  },
  methods: {
    open(msg, action) {
      //打开弹窗
      this.$alert(msg, '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action) {
            this.$router.push('/')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#main_container {
  width: 100%;
  height: 100%;
  background: rgba(9, 14, 34, 1);
  .section {
    width: 100%;
    height: 90%;
    padding: 15px;
    display: -webkit-flex;
    display: flex;
    .left {
      width: 25%;
    }
    .mid {
      width: 50%;
    }
    .right {
      width: 25%;
    }
  }
}
</style>
