<template>
    <div class="drawLines" id="drawName"></div>
</template>

<script>
import carinfoApi from '@/api/carinfo'
import { fmtDate } from '@/utils/date'
export default {
  data() {
    return {
      dataTime: [],
      dataNum: []
    }
  },
  mounted() {
    carinfoApi.getStockMon().then(({ success, data: { data } }) => {
      if (success) {
        this.dataTime = data.map(ele => {
          return fmtDate(ele.bizDate)
        })
        this.dataNum = data.map(ele => {
          return ele.inventoryWeight
        })
        this.drawList(this.dataTime, this.dataNum)
      }
    })
  },
  methods: {
    drawList(time, data) {
      let maxInterval = 28
      let len = time.length
      let interval = Math.min(maxInterval, len) - 2
      let myEcharts = this.$echarts.init(document.getElementById('drawName'))
      myEcharts.setOption({
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
          left: 60,
          right: 60,
          top: 25,
          bottom: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: interval,
            showMinLabel: true
            // formatter(val) {
            //   return format(new Date(val), 'MM月DD日')
            // }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          data: time
        },
        yAxis: {
          // show: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(41,48,102,1)',
              type: 'dashed'
            }
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: '库存总量',
            type: 'line',
            symbol: 'none', //这句就是去掉点的
            smooth: true, //这句就是让曲线变平滑的
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0)',
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
                }
              }
            },
            data: data,
            markPoint: {
              symbol: 'pin',
              label: {
                show: true,
                position: 'insideTop',
                color: '#fff',
                formatter: function(p) {
                  return p.value + '吨'
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
            }
          }
        ]
      })
      // myEcharts.on('click', function(p) {
      //   // console.log(p)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.drawLines {
  flex: 1;
  // width: 100%;
  // height: 100%;
}
</style>

