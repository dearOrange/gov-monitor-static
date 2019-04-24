<template>
  <div class="rate-mix" @click="gotoBulk()">
    <ring :process="data.tracePercent*100 || 0" beginColor="#444FFF" endColor="#9836FB">
      <div class="ring-text">
        <i class="icon icon-gold"></i>
        <p>商品可溯源比例</p>
      </div>
    </ring>
    <ring :process="data.tempReachPercent*100 || 0" beginColor="#E94029" endColor="#FFC418">
      <div class="ring-text">
        <i class="icon icon-temperature"></i>
        <p>仓内温度达标率</p>
      </div>
    </ring>
  </div>
</template>

<script>
import Ring from './ring'
export default {
  name: 'rate-mix',
  components: {
    Ring
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
    gotoBulk() {
      this.$router.push('/bulktemp')
    }
  }
}
</script>

<style lang="less" scoped>
.rate-mix {
  height: 44%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 0;
  background: rgba(94, 109, 240, 0.1);
  cursor: pointer;
  .ring {
    position: relative;
    height: 228px;
    .ring-text {
      position: absolute;
      bottom: 0;
      width: 100%;
      color: rgba(200, 210, 255, 1);
      p {
        font-size: 20px;
        margin-top: 20px;
      }
    }
  }
}
</style>
