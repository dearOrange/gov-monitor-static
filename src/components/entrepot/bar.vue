<template>
  <div :id="firstId"></div>
</template>

<script>
import truckApi from '../../api/login'
export default {
  name: 'FirstBar',
  props: {
    firstId: {
      type: String
    }
  },
  data() {
    return {
      baBizUnits: [],
      baStocks: []
    }
  },
  mounted() {
    truckApi.getTruck().then(res => {
      if (res.success) {
        let data = res.data.data
        let cityOne = [],
          totalOne = [],
          orgMon = [],
          cityTwo = [],
          totalTwo = [],
          stockMon = []
        if (data.stockType === 'C') {
          cityOne = data.baBizUnits.map(ele => {
            return ele.district
          })
          cityTwo = data.baStocks.map(ele => {
            return ele.district
          })
        } else if (data.stockType === 'B') {
          cityOne = data.baBizUnits.map(ele => {
            return ele.city
          })
          cityTwo = data.baStocks.map(ele => {
            return ele.city
          })
        }

        totalOne = data.baBizUnits.map(ele => {
          return ele.orgNum
        })
        orgMon = data.baBizUnits.map(ele => {
          return ele.orgMonitorNum
        })

        totalTwo = data.baStocks.map(ele => {
          return ele.stockNum
        })
        stockMon = data.baStocks.map(ele => {
          return ele.stockMonitorNum
        })
        this.drawBarOne(cityOne, totalOne, orgMon)
        this.drawBarTwo(cityTwo, totalTwo, stockMon)
      }
    })
  },
  methods: {
    drawBarOne(cityOne, totalOne, orgMon) {
      let firstBar = this.$echarts.init(document.getElementById('first-bar'))
      var firstBarOp = {
        title: {
          text: '各地区企业接入情况',
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 100
          },
          orient: 'vertical', //垂直显示
          x: 'center', //居右显示
          padding: [15, 0]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          // selectedMode: false,
          data: ['已接入数', '总数'],
          textStyle: {
            color: '#fff'
          },
          orient: 'vertical', //垂直显示
          right: 20,
          top: 30,
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          left: 35,
          right: 60,
          top: 90,
          bottom: 60
        },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            name: '地区',
            data: cityOne,
            splitLine: { show: false }, //去除网格线
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          {
            type: 'category',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitArea: { show: false },
            splitLine: { show: false },
            data: cityOne
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            realtime: true,
            bottom: 0,
            textStyle: {
              color: '#fff'
            },
            start: 0,
            end: 100
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            splitLine: { show: false }, //去除网格线
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            name: '总数',
            type: 'bar',
            barCategoryGap: 15,
            itemStyle: {
              normal: {
                color: '#5F6A96',
                barBorderColor: '#5F6A96',
                // barBorderWidth: 6,
                barBorderRadius: 0
                // label: {
                //   show: true,
                //   position: 'insideTop'
                // }
              }
            },
            data: totalOne
          },
          {
            name: '已接入数',
            type: 'bar',
            barCategoryGap: 15,
            xAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#DC8640',
                barBorderColor: '#DC8640',
                // barBorderWidth: 6,
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'insideTop',
                  textStyle: {
                    color: '#fff'
                  },
                  formatter: function(p) {
                    for (
                      var i = 0, l = firstBarOp.xAxis[0].data.length;
                      i < l;
                      i++
                    ) {
                      if (firstBarOp.xAxis[0].data[i] == p.name) {
                        var perAg = (
                          (p.value / firstBarOp.series[0].data[i]) *
                          100
                        ).toFixed(0)
                        return perAg + '%'
                      }
                    }
                  }
                }
              }
            },
            data: orgMon
          }
        ]
      }
      firstBar.setOption(firstBarOp)
    },
    drawBarTwo(cityTwo, totalTwo, stockMon) {
      let secondBar = this.$echarts.init(document.getElementById('second-bar'))
      var secondBarOp = {
        title: {
          text: '各地区仓库接入情况',
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 100
          },
          orient: 'vertical', //垂直显示
          x: 'center', //居右显示
          padding: [15, 0]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          // selectedMode: false,
          data: ['已接入数', '总数'],
          textStyle: {
            color: '#fff'
          },
          orient: 'vertical', //垂直显示
          right: 20,
          top: 30,
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          left: 35,
          right: 60,
          top: 90,
          bottom: 60
        },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            name: '地区',
            data: cityTwo,
            splitLine: { show: false }, //去除网格线
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          {
            type: 'category',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitArea: { show: false },
            splitLine: { show: false },
            data: cityTwo
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            realtime: true,
            textStyle: {
              color: '#fff'
            },
            bottom: 0,
            start: 0,
            end: 100
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            splitLine: { show: false }, //去除网格线
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            name: '总数',
            type: 'bar',
            barCategoryGap: 15,
            itemStyle: {
              normal: {
                color: '#5F6A96',
                barBorderColor: '#5F6A96',
                // barBorderWidth: 6,
                barBorderRadius: 0
                // label: {
                //   show: true,
                //   position: 'insideTop'
                // }
              }
            },
            data: totalTwo
          },
          {
            name: '已接入数',
            type: 'bar',
            barCategoryGap: 15,
            xAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#03ACFF',
                barBorderColor: '#03ACFF',
                // barBorderWidth: 6,
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'insideTop',
                  textStyle: {
                    color: '#fff'
                  },
                  formatter: function(p) {
                    for (
                      var i = 0, l = secondBarOp.xAxis[0].data.length;
                      i < l;
                      i++
                    ) {
                      if (secondBarOp.xAxis[0].data[i] == p.name) {
                        var perAg = (
                          (p.value / secondBarOp.series[0].data[i]) *
                          100
                        ).toFixed(0)
                        return perAg + '%'
                      }
                    }
                  }
                }
              }
            },
            data: stockMon
          }
        ]
      }
      secondBar.setOption(secondBarOp)
    }
  }
}
</script>

<style>
#first-bar,
#second-bar {
  width: 100%;
  height: 100%;
}
</style>
