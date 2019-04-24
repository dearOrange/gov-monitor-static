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
      console.log(res)
      if (res.success) {
        let data = res.data.data
        this.baBizUnits = data.baBizUnits.map(ele => {
          let cityOne = [],
            totalOne = [],
            orgMon = []
          cityOne.push(ele.city)
          totalOne.push(ele.orgNum)
          orgMon.push(ele.orgMonitorNum)
          return { cityOne, totalOne, orgMon }
        })
        this.baStocks = data.baStocks.map(ele => {
          let cityTwo = [],
            totalTwo = [],
            stockMon = []
          cityTwo.push(ele.city)
          totalTwo.push(ele.stockNum)
          stockMon.push(ele.stockMonitorNum)
          return { cityTwo, totalTwo, stockMon }
        })
        this.drawBarOne(
          this.baBizUnits[0].cityOne,
          this.baBizUnits[0].totalOne,
          this.baBizUnits[0].orgMon
        )
        this.drawBarTwo(
          this.baStocks[0].cityTwo,
          this.baStocks[0].totalTwo,
          this.baStocks[0].stockMon
        )
      }
    })
  },
  methods: {
    drawBarOne(cityOne, totalOne, orgMon) {
      let firstBar = this.$echarts.init(document.getElementById('first-bar'))
      var firstBarOp = {
        title: {
          text: '各地区仓库接入情况',
          textStyle: {
            color: '#fff',
            fontSize: 14
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
          top: 20
        },
        grid: {
          left: 35,
          right: 40,
          top: 70,
          bottom: 25
        },
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
            show: true,
            xAxisIndex: [0],
            left: '9%',
            bottom: -5,
            start: 10,
            end: 90 //初始化滚动条
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
            fontSize: 14
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
          top: 20
        },
        grid: {
          left: 35,
          right: 40,
          top: 70,
          bottom: 25
        },
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
