<template>
    <div class="carinfo-container">
        <Header :isShow="isShow"/>
        <div class="carinfo-content">
            <div class="carinfo-top">
                <div class="top-con">
                    <h2>近30日库存总量曲线</h2>
                    <ComLines v-if="lineShow"/>
                </div>
            </div>
            <div class="carinfo-bottom">
                <div class="carinfo-inner">
                    <div class="bot-con">
                        <RankName/>
                        <div class="rank-table">
                        <RankingTab/>
                        </div>
                    </div>
                </div>
                <div class="carinfo-inner">
                    <div class="bot-con">
                        <DoubleBar/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@components/common/header'
import ComLines from '@components/common/comlines'
import RankName from '@components/main/rankName'
import RankingTab from '@components/common/rankingtab'
import DoubleBar from '@components/common/doubleBar'
export default {
  components: {
    Header,
    ComLines,
    RankName,
    RankingTab,
    DoubleBar
  },
  data() {
    return {
      isShow: false,
      lineShow: true
    }
  }
}
</script>

<style lang="less" scoped>
.carinfo-content {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  .carinfo-top {
    flex: 1;
    padding-bottom: 8px;
    .top-con {
      width: 100%;
      height: 100%;
      background: rgba(94, 109, 240, 0.1);
      display: flex;
      flex-direction: column;
      padding-top: 40px;
      h2 {
        // height: 24px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        // padding: 41px 0 0 65px;
        margin-left: 65px;
        margin-bottom: 22px;
      }
    }
  }
  .carinfo-bottom {
    flex: 1;
    display: flex;
    padding-top: 8px;
    .carinfo-inner {
      flex: 1;
      &:first-of-type {
        padding-right: 10px;
      }
      &:last-of-type {
        padding-left: 10px;
      }
      .bot-con {
        width: 100%;
        height: 100%;
        background: rgba(94, 109, 240, 0.1);
        &:first-of-type {
          display: flex;
          padding-top: 33px;
          .rank-table {
            flex: 1;
            padding: 0 21px 13px 0;
          }
        }
      }
    }
  }
}
</style>

