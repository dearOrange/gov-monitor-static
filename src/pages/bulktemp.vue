<template>
    <div class="bulk-container">
        <Header :isShow="isShow"/>
        <div class="mid-bulk-content">
            <div class="bulk-top">
                <BulkTitle :titleName="titleNameOne" :titleNum="titleNumOne"/>
                <BulkTitle :titleName="titleNameTwo" :titleNum="titleNumTwo"/>
                <BulkTitle :titleName="titleNameThree" :titleNum="titleNumThree"/>
            </div>
          <div class="bulk-bot">
              <BulkLine/>
          </div>
        </div>
        <div class="bottom-bulk-content">
            <div class="bot-title">
                <p></p>
                <h3>大类商品可溯源率</h3>
            </div>
            <div class="bot-content">
              <PoloCon />
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@components/common/header'
import BulkTitle from '@components/common/bulktitle'
import BulkLine from '@components/common/line'
import PoloCon from '@components/common/polocon'
import truckApi from '@/api/login'
export default {
  components: {
    Header,
    BulkTitle,
    BulkLine,
    PoloCon
  },
  data() {
    return {
      titleNameOne: '仓库整体温度达标率',
      titleNameTwo: '车辆整体温度达标率',
      titleNameThree: '商品整体可溯源率',
      titleNumOne: '0',
      titleNumTwo: '0',
      titleNumThree: '0',
      tracePercent: [],
      isShow: false
    }
  },
  mounted() {
    truckApi.getTrace().then(res => {
      if (res.success) {
        let data = res.data.data
        this.titleNumOne = (data.stockTrace * 100).toFixed(0)
        this.titleNumTwo = (data.carTrace * 100).toFixed(0)
        this.titleNumThree = (data.categoryTrace * 100).toFixed(0)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.mid-bulk-content {
  height: 60vh;
  display: flex;
  flex-direction: column;
  padding: 20px 52px 0;
  .bulk-top {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
  }
  .bulk-bot {
    flex: 1;
  }
}

.bottom-bulk-content {
  height: 30vh;
  padding: 0 52px;
  .bot-title {
    display: flex;
    padding: 20px 0px 20px 22px;
    p {
      padding: 10px 3px;
      background: rgba(3, 172, 255, 1);
    }
    h3 {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      margin-left: 16px;
    }
  }
  .bot-content {
    display: flex;
    height: 200px;
    overflow-x: auto;
  }
}
.bulk-title:first-of-type {
  // margin-left: 34px;
  background: linear-gradient(
    0deg,
    rgba(68, 79, 255, 1),
    rgba(152, 54, 251, 1)
  );
}
.bulk-title:nth-of-type(2) {
  background: linear-gradient(
    0deg,
    rgba(21, 232, 132, 1),
    rgba(1, 183, 194, 1)
  );
}
.bulk-title:last-of-type {
  // margin-right: 85px;
  background: linear-gradient(
    0deg,
    rgba(233, 64, 41, 1),
    rgba(255, 196, 24, 1)
  );
}
</style>
