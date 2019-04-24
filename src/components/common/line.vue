<template>
    <div id="bulk-line"></div>
</template>

<script>
import getTrackBar from '@/api/login'
import { fmtDate } from '@utils/date'
export default {
  name: 'BulkLine',
  data() {
    return {}
  },
  mounted() {
    getTrackBar.getTraceBar().then(res => {
      if (res.success) {
        let data = res.data.data
        let carMon = data.carMonitorDataList.map(ele => {
          return fmtDate(ele.bizDate)
        })
        let carMonNum = data.carMonitorDataList.map(ele => {
          return (ele.tempReachPercent * 100).toFixed(0)
        })

        let stockMon = data.stockMonitorDataList.map(ele => {
          return (ele.tempReachPercent * 100).toFixed(0)
        })
        let category = data.categoryDataList.map(ele => {
          return (ele.tracePercent * 100).toFixed(0)
        })
        this.drawLines(carMon, carMonNum, stockMon, category)
      }
    })
  },
  methods: {
    drawLines(date, num1, num2, num3) {
      let maxInterval = 28
      let len = date.length
      let interval = Math.min(maxInterval, len) - 2
      let bulkLine = this.$echarts.init(document.getElementById('bulk-line'))
      let lineOption = {
        toolbox: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 40,
          right: 40,
          top: 60,
          bottom: 30
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            name: '日期',
            nameTextStyle: {
              color: 'rgba(57,225,233,1)',
              fontSize: 12
            },
            data: date,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(41,48,102,1)',
                type: 'dashed'
              }
            }, //是否显示网格线
            axisLabel: {
              color: 'rgba(137,140,161,1)',

              interval: interval
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(137,140,161,1)'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '达标率',
            nameTextStyle: {
              color: 'rgba(57,225,233,1)',
              fontSize: 12
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(41,48,102,1)',
                type: 'dashed'
              }
            }, //是否显示网格线
            axisLabel: {
              color: 'rgba(137,140,161,1)',
              formatter: '{value}%'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(137,140,161,1)'
              }
            }
          }
        ],
        series: [
          {
            name: '仓库整体温度达标',
            type: 'line',
            // stack: '总量',
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(68,79,255,1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(152,54,251,1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(218,255,230,.25)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(97,151,196,.25)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            symbol: 'none', //这句就是去掉点的
            smooth: true, //这句就是让曲线变平滑的
            data: num2
          },
          {
            name: '车辆整体温度达标',
            type: 'line',
            // stack: '总量',
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(32,253,148,1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(17,210,227,1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(218,255,230,.25)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(97,151,196,.25)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            symbol: 'none', //这句就是去掉点的
            smooth: true, //这句就是让曲线变平滑的
            data: num1
          },
          {
            name: '商品整体可溯源率',
            type: 'line',
            // stack: '总量',
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(233,64,41,1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,196,24,1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(218,255,230,.25)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(97,151,196,.25)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            symbol: 'none', //这句就是去掉点的
            smooth: true, //这句就是让曲线变平滑的
            data: num3
          }
        ]
      }
      bulkLine.setOption(lineOption)
    }
  }
}
</script>

<style lang="less" scoped>
#bulk-line {
  width: 100%;
  height: 100%;
}
</style>

