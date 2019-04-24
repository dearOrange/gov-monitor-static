<template>
  <div class="trend">
    <ul class="trend-total">
      <li class="item">
        <span class="num">
          <num :to="stockMonTotal" :period="1000"></num>
        </span>
        <span class="text">交易总额(万元)</span>
      </li>
      <li class="line"></li>
      <li class="item">
        <span class="num">
          <num :to="stockMonAvg" :period="1000" fix></num>
        </span>
        <span class="text">30天交易额(万元)</span>
      </li>
    </ul>
    <div class="trend-daily">
      <div class="head">
        <i class="icon icon-trend2"></i>
        <span>30天交易额曲线</span>
      </div>
      <div class="graph" id="graphTwo" ref="graph"></div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { fmtDate } from '@utils/date'
import { fetchAllData } from '@/api/trace'
import Num from '@components/common/num'
export default {
  name: 'trend',
  components: {
    Num
  },
  props: {
    // data: Object
  },

  data() {
    return {
      myEcharts: null,
      stockMonTotal: 0,
      stockMonAvg: 0
    }
  },
  watch: {
    // data(newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     this.render()
    //   }
    // }
  },

  methods: {
    render(bizDate, transactionAmount) {
      let maxInterval = 28
      let len = bizDate.length
      let interval = Math.min(maxInterval, len) - 2

      this.myEcharts.setOption({
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: 35,
          right: 35,
          top: 25,
          bottom: 20
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: interval,
            showMinLabel: true,
            formatter(val) {
              return format(new Date(val), 'MM月DD日')
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          data: bizDate
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: '出货量',
            type: 'line',
            symbol: 'none', //这句就是去掉点的
            smooth: true, //这句就是让曲线变平滑的
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0)',
                lineStyle: {
                  color: '#3BEFF5'
                }
              }
            },
            data: transactionAmount,
            markPoint: {
              symbol: 'pin',
              label: {
                show: true,
                position: 'insideTop',
                color: '#fff',
                formatter: function(p) {
                  return p.value + '万元'
                }
              },
              data: [
                {
                  type: 'max',
                  name: '最大值',
                  symbol: 'circle'
                },
                {
                  type: 'min',
                  name: '最小值',
                  symbol: 'circle'
                }
              ]
            },
            areaStyle: {
              color: 'rgba(59,239,245,0.48)'
            }
          }
        ]
      })
    },
    async getList() {
      let {
        success,
        data: { data }
      } = await fetchAllData()
      if (success) {
        this.stockMonAvg = data.stockMonAvg
        this.stockMonTotal = data.stockMonTotal

        this.myEcharts = this.$echarts.init(document.getElementById('graphTwo'))
        if (data && data.biStockMonitorDataList) {
          let bizDate = data.biStockMonitorDataList.map(ele => {
            return fmtDate(ele.bizDate)
          })
          let transactionAmount = data.biStockMonitorDataList.map(ele => {
            return ele.transactionAmount
          })
          this.render(bizDate, transactionAmount)
        }
      }
    }
  },

  mounted() {
    // this.myEcharts = this.$echarts.init(document.getElementById('graphTwo'))
    // if (this.data && this.data.bizDate) {
    //   this.render()
    // }
    this.getList()
    window.setInterval(() => {
      this.getList()
    }, 30000)
  }
}
</script>

<style lang="less" scoped>
.trend {
  // height: 54%;
  flex: 1;
  padding: 10px 0 20px;
  background: rgba(94, 109, 240, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;

  .trend-total {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    height: 20%;
    li.item {
      display: flex;
      flex-direction: column;
      // align-items: center;
      flex: 0 1 auto;
      // flex-basis: 50%;
      .num {
        font-family: MicrosoftYaHei-Bold;
        font-weight: 700;
        font-size: 38px;
        color: #03ffd8;
      }
      .text {
        color: #fff;
      }
    }

    li.line {
      width: 1px;
      background: #000;
    }
  }

  .trend-daily {
    height: 80%;
    .head {
      display: flex;
      align-items: flex-end;
      height: 20%;
      padding: 0 30px;
      margin-top: 16px;
      color: #fff;
      i {
        margin-right: 6px;
        vertical-align: middle;
      }
    }

    .graph {
      height: 80%;
      // height: 250px;
    }
  }
}
</style>


