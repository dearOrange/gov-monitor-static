<template>
  <div class="ewv-mix" @click="goToEntrepot()">
    <div class="info e">
      <div class="head">
        <i class="icon icon-company"></i>
        <span>企业信息</span>
      </div>
      <ul class="list">
        <li>
          <span class="num">
            <num :to="data.orgNum"></num>
          </span>
          <span class="text">企业数量</span>
        </li>
        <li>
          <span class="num">
            <num :to="data.orgMonitorNum"></num>
          </span>
          <span class="text">已接入数量</span>
        </li>
        <li></li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="info w">
      <div class="head">
        <i class="icon icon-store"></i>
        <span>仓库信息</span>
      </div>
      <ul class="list">
        <li>
          <span class="num">
            <num :to="data.stockNum"></num>
          </span>
          <span class="text">仓库数量</span>
        </li>
        <li>
          <span class="num">
            <num :to="data.stockMonitorNum"></num>
          </span>
          <span class="text">已接入数量</span>
        </li>
        <li>
          <span class="num">
            <num :to="data.stockTotalAcreage"></num>
          </span>
          <span class="text">仓库总容积
            <br>
            <em class="unit">(吨)</em>
          </span>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="info v">
      <div class="head">
        <i class="icon icon-car"></i>
        <span>车辆信息</span>
      </div>
      <ul class="list">
        <li>
          <span class="num">
            <num :to="data.carNum"></num>
          </span>
          <span class="text">车辆数量</span>
        </li>
        <li>
          <span class="num">
            <num :to="data.carMonitorNum"></num>
          </span>
          <span class="text">已接入数量</span>
        </li>
        <li>
          <span class="num">
            <num :to="data.carOnlineTotal"></num>
          </span>
          <span class="text">在线数量</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Num from '@components/common/num'
export default {
  name: 'ewv-mix',
  components: {
    Num
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    goToEntrepot() {
      this.$router.push({ name: 'Entrepot', params: { data: this.data } })
    }
  }
}
</script>

<style lang="less" scoped>
.ewv-mix {
  height: 55%;
  padding: 20px 25px 40px;
  background: rgba(94, 109, 240, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .line {
    height: 1px;
    background: #060821;
  }
  .info {
    cursor: pointer;
    .head {
      color: #fff;
      i {
        vertical-align: text-bottom;
        height: 28px;
        width: 32px;
      }
    }
    .list {
      display: flex;
      margin-top: 8px;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 1 auto;
        flex-basis: 33%;
        .num {
          font-family: MicrosoftYaHei-Bold;
          font-weight: 700;
          font-size: 40px;
        }
        .text {
          color: #fff;
          text-align: center;
          .unit {
            font-weight: normal;
            font-size: 14px;
            // color: rgba(232, 122, 9, 1);
            // white-space:nowrap;
            // text-align: center;
          }
        }
      }
    }

    &.e {
      .num {
        color: rgba(0, 184, 249, 1);
      }
    }
    &.w {
      .num {
        color: rgba(232, 122, 9, 1);
      }
    }
    &.v {
      .num {
        color: rgba(110, 206, 96, 1);
      }
    }
  }
}
</style>

