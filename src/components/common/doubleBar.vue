<template>
    <div id="double-bar"></div>
</template>

<script>
import carinfoApi from '@/api/carinfo'
export default {
  data() {
    return {}
  },
  mounted() {
    carinfoApi.getAreaCate().then(({ success, data: { data } }) => {
      if (success) {
        let city = [],
          dataOne = [],
          dataTwo = []
        city = data
          .map(ele => {
            return ele.senderCity
          })
          .slice(0, 10)
          .reverse()
        dataOne = data
          .map(ele => {
            return {
              value: ele.categoryTotal,
              name: ele.categoryName
            }
          })
          .slice(0, 10)
          .reverse()
        dataTwo = data
          .map(ele => {
            return ele.areaTotal
          })
          .slice(0, 10)
          .reverse()
        this.drawDouble(city, dataOne, dataTwo)
      }
    })
  },
  methods: {
    drawDouble(city, data1, data2) {
      let doubleBar = this.$echarts.init(document.getElementById('double-bar'))
      let doubleOp = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['近30日商品发货总量地区TOP10', '近30日各地区主要大类商品'],
          textStyle: {
            color: '#fff'
          },
          orient: 'vertical', //垂直显示
          right: 36,
          bottom: 20,
          itemWidth: 12,
          itemHeight: 12
        },
        grid: {
          top: 10,
          left: 40,
          right: 85,
          bottom: 10,
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          data: city
        },
        series: [
          {
            name: '近30日商品发货总量地区TOP10',
            type: 'bar',
            barCategoryGap: 14,
            itemStyle: {
              normal: {
                color: '#FFD143',
                barBorderColor: '#FFD143',
                label: {
                  show: true,
                  position: 'right',
                  formatter: function(p) {
                    return p.value + '吨'
                  }
                }
              }
            },
            data: data2
          },
          {
            name: '近30日各地区主要大类商品',
            type: 'bar',
            // barCategoryGap: 2,
            itemStyle: {
              normal: {
                color: '#15B7F5',
                barBorderColor: '#15B7F5',
                label: {
                  show: true,
                  position: 'right',
                  formatter: function(p) {
                    return p.name + '[' + p.value + '吨]'
                  }
                }
              }
            },
            data: data1
          }
        ]
      }
      doubleBar.setOption(doubleOp)
    }
  }
}
</script>

<style lang="less" scoped>
#double-bar {
  width: 100%;
  height: 100%;
}
</style>

