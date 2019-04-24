<template>
  <div id="enterpot">
    <Header :isShow="isShow"/>
    <div class="enterpot-content">
      <div class="item">
        <div class="inner">
          <div class="inner-fl">
            <plaque
              :data="[{label: '企业总数', value: parData.orgNum}, {label: '已接入数', value: parData.orgMonitorNum}]"
            ></plaque>
            <div class="inner-echarts">
              <entrepot-bar :firstId="firstId"/>
            </div>
          </div>
          <div class="inner-fl">
            <!-- <FirstMap :firstId="fifthId"/> -->
            <province-map></province-map>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="inner inner-third">
          <div class="third-title">
            <h2>车辆实时位置</h2>
            <plaque
              class="title-flex"
              :data="[{label: '车辆总数', value: parData.carNum}, {label: '监控数', value: parData.carMonitorNum}, {label: '在线数', value: parData.carOnlineTotal}, {label: '异常', value: 0}]"
            ></plaque>
          </div>
          <div class="third_container">
            <rtm-map></rtm-map>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="inner">
          <div class="inner-fl">
            <plaque
              :data="[{label: '仓库总数', value: parData.stockNum}, {label: '已接入数', value: parData.stockMonitorNum}, {label: '总容积', value: parData.stockTotalAcreage} ]"
            ></plaque>
            <div class="inner-echarts">
              <entrepot-bar :firstId="secondId"/>
            </div>
          </div>
          <div class="inner-fl">
            <cang-map></cang-map>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="inner">
          <div class="inner-fl">
            <!-- <entrepot-pie :firstId="fourthId"/>
            <i v-if="isTrue" class="icon icon-train"></i>-->
            <EntrepotSelect></EntrepotSelect>
            <EntrepotVideo :video="videoOne"></EntrepotVideo>
          </div>
          <div class="inner-fl">
            <!-- <entrepot-pie :firstId="thirdId"/>
            <i v-if="isFalse" class="icon icon-cloun"></i>-->
            <EntrepotSelect></EntrepotSelect>
            <EntrepotVideo :video="videoTwo"></EntrepotVideo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@components/common/header'

// import EntrepotPie from '@components/entrepot/pie'
import EntrepotBar from '@components/entrepot/bar'
import Plaque from '@components/entrepot/plaque'
import ProvinceMap from '@components/entrepot/province-map'
import CangMap from '@components/entrepot/cang-map'
import RtmMap from '@components/entrepot/rtm-map'
import EntrepotSelect from '@components/entrepot/select'
import EntrepotVideo from '@components/entrepot/video'
// import truckApi from '@/api/login'
export default {
  name: 'Entrepot',
  components: {
    Header,
    Plaque,
    RtmMap,
    ProvinceMap,
    CangMap,
    EntrepotBar,
    // EntrepotPie
    EntrepotSelect,
    EntrepotVideo
  },
  data() {
    return {
      firstId: 'first-bar',
      secondId: 'second-bar',
      thirdId: 'first-pie',
      fourthId: 'second-pie',
      fifthId: 'first-map',
      sixthId: 'second-map',
      sevenId: 'third-map',
      parData: {},
      isShow: false,
      isTrue: true,
      isFalse: true,
      videoOne: require('../assets/video/1.mp4'),
      videoTwo: require('../assets/video/2.mp4')
    }
  },
  mounted() {
    this.parData = this.$route.params.data
    // this.bus.$on('isTrue', res => {
    //   this.isTrue = res
    // })
    // this.bus.$on('isFalse', res => {
    //   this.isFalse = res
    // })
  }
}
</script>

<style lang="less" scoped>
.enterpot-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 20px;
  .item {
    flex: 1 auto;
    width: 50%;
    height: 50%;
    // padding: 20px 0 0 20px;
    .inner {
      height: 100%;
      width: 100%;
      background: #182250;
      border-radius: 4px;
      display: flex;
      &.inner-third {
        flex-direction: column;
      }
      .inner-fl {
        flex: 1;
        position: relative;
        &:first-child {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        &:last-child {
          display: flex;
          flex-direction: column;
          padding: 20px 20px 20px 0;
          // background: rgba(18, 17, 73, 1);
        }
        .inner-echarts {
          margin-top: 20px;
          flex: 1;
          background: rgba(18, 17, 73, 1);
        }
      }
    }
    &:nth-child(odd) {
      padding-right: 10px;
    }
    &:nth-child(even) {
      padding-left: 10px;
    }
    &:nth-child(n) {
      padding-bottom: 10px;
    }
    &:nth-child(n + 3) {
      padding-bottom: 0;
      padding-top: 10px;
    }
    // &:nth-child(2n + 2) {
    //   padding-right: 20px;
    // }
  }
}

.title-con {
  border: 1px solid rgba(20, 59, 122, 1);
  position: relative;
  .border-dot {
    width: 4px;
    height: 4px;
    background: rgba(61, 168, 249, 1);
    border-radius: 50%;
    position: absolute;
    &:nth-child(odd) {
      left: -2px;
    }
    &:nth-child(even) {
      right: -2px;
    }
    &:nth-child(1) {
      top: -2px;
    }
    &:nth-child(2) {
      top: -2px;
    }
    &:nth-child(3) {
      bottom: -2px;
    }
    &:nth-child(4) {
      bottom: -2px;
    }
  }
}
.inner-title {
  display: flex;
  padding: 10px 0;
  background: rgba(20, 59, 122, 1);
  text-align: center;
  margin: 3px;
  .entreLine {
    width: 2px;
    height: 18px;
    background: rgba(12, 17, 42, 1);
  }
}
.third-title {
  display: flex;
  padding: 20px;
  h2 {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    padding: 9px 40px 9px 0;
  }
}
.third_container {
  flex: 1;
}
.title-flex {
  flex: 1;
}
</style>

