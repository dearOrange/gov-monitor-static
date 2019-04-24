<template>
    <div id="ranking">
        <div class="ranking-img" v-for="(item, index) in dataCity" :key="index">
            <div class="rank-city">{{item}}</div>
        </div>
    </div>
</template>

<script>
export default {
  // props: {
  //   data: Array
  // },
  data() {
    return {
      dataCity: []
    }
  },
  mounted() {
    this.bus.$on('receiverCity', res => {
      //通过$on监听事件sharetext
      this.dataCity = res
    })
  }
}
</script>

<style lang="less" scoped>
#ranking {
  padding: 0 25px;
  position: relative;
  .ranking-img {
    width: 130px;
    height: 130px;
    // border-radius: 50%;
    position: absolute;
    &:nth-of-type(1) {
      top: 40px;
      left: 0;
      right: 0;
      margin: auto;
      background: url(../../assets/img/1.png) no-repeat center center;
      background-size: cover;
      .rank-city {
        color: rgba(235, 162, 1, 1);
      }
    }
    &:nth-of-type(2) {
      left: 25px;
      top: 180px;
      display: inline-block;
      background: url(../../assets/img/2.png) no-repeat center center;
      background-size: cover;
      .rank-city {
        color: rgba(239, 82, 85, 1);
      }
    }
    &:nth-of-type(3) {
      right: 25px;
      top: 180px;
      display: inline-block;
      margin-left: 50px;
      background: url(../../assets/img/3.png) no-repeat center center;
      background-size: cover;
      .rank-city {
        color: rgba(60, 193, 50, 1);
      }
    }

    .rank-city {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
    }
  }
}
</style>
