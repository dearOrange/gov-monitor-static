<template>
  <div class="polo-con">
    <div class="aa" :id="firstId"></div>
    <div class="polo-explain">
        <span :class="'polonum' + index">{{index+1}}</span>
        <span>{{name}}</span>
    </div>
  </div>
</template>

<script>
import echartsLiquidfill from 'echarts-liquidfill'
export default {
  name: 'WaterPolo',
  props: {
    firstId: {
      type: String
    },
    data: {
      type: String
    },
    index: {
      type: Number
    },
    name: {
      type: String
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      tracePercent: []
    }
  },
  mounted() {
    this.drawPolo(this.data, this.color)
  },
  methods: {
    drawPolo(data, color) {
      let waterPolo = this.$echarts.init(document.getElementById(this.firstId))
      var polOption = {
        //   backgroundColor: '#04184A',
        series: [
          {
            type: 'liquidFill',
            //data: [0.6, 0.5, 0.4, 0.3],
            data: [data],
            radius: '80%',
            // 水球颜色
            color: [color],
            center: ['50%', '50%'],
            // outline  外边
            outline: {
              show: false
            },
            label: {
              normal: {
                // textStyle: {
                color: '#fff',
                insideColor: '#fff',
                fontSize: 18
                // }
              }
            },
            // 内图 背景色 边
            backgroundStyle: {
              color: '#33417A'
              // borderWidth: 5,
              // borderColor: 'red',
            }
          }
        ]
      }
      waterPolo.setOption(polOption)
    }
  }
}
</script>

<style lang="less" scoped>
.polo-con {
  display: flex;
  flex-direction: column;
}
.polo-con,
.aa {
  width: 100%;
  height: 100%;
}
.aa {
  flex: 1;
}
.polo-explain {
  height: 30px;
  text-align: center;
  span {
    display: inline-block;
    &:first-of-type {
      width: 30px;
      height: 30px;
      background: rgba(108, 101, 251, 1);
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
    &:last-of-type {
      font-size: 18px;
      line-height: 30px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left: 4px;
    }
  }
}
.polonum0 {
  background: rgba(248, 176, 17, 1) !important;
}
.polonum1 {
  background: rgba(252, 103, 165, 1) !important;
}
.polonum2 {
  background: rgba(147, 223, 252, 1) !important;
}
</style>

