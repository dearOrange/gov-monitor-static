<template>
  <div :id="firstId"></div>
</template>

<script>
import truckApi from '../../api/login'
export default {
  name: 'FirstPie',
  props: {
    firstId: {
      type: String
    }
  },
  data() {
    return {
      baCars: [],
      baCarsName: [],
      baCarList: []
    }
  },
  mounted() {
    truckApi.getTruck().then(res => {
      if (res.success) {
        let data = res.data.data
        if (data.baCars) {
          this.baCars = data.baCars.map(el => {
            el.accessEatio = (el.accessEatio * 100).toFixed(0)
            el.carTypeName = el.carTypeName
            return {
              value: el.accessEatio,
              name: el.carTypeName
            }
          })
          this.baCarsName = this.baCars.map(el => {
            return el.name
          })
          this.drawListTwo(this.baCars, this.baCarsName)
        } else {
          this.bus.$emit('isTrue', false)
        }
        if (data.baCarList) {
          this.baCarList = data.baCarList.map(el => {
            el.accessEatio = (el.accessEatio * 100).toFixed(1)
            el.carTemperatureTypeName = el.carTemperatureTypeName
            return {
              value: el.accessEatio,
              name: el.carTemperatureTypeName
            }
          })
          this.drawListOne(this.baCarList)
        } else {
          this.bus.$emit('isFalse', false)
        }
      }
    })
  },
  methods: {
    drawListOne(data) {
      let firstPie = this.$echarts.init(document.getElementById('first-pie'))

      var placeHolderStyle = {
        normal: {
          color: '#393d50',
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: '#393d50'
        }
      }
      var pieOption = {
        title: {
          text: '车辆温控类型分布',
          orient: 'vertical', //垂直显示
          x: '16%',
          padding: [15, 0],
          textStyle: {
            fontWeight: 'normal',
            fontSize: 24,
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          show: true,
          formatter: '{b} : <br/>{d}%',
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], //内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);' //添加阴影
        },
        legend: {
          orient: 'vertical',
          right: 20,
          y: 'center',
          itemGap: 20,
          data: ['冷冻', '冷藏', '常温'],
          textStyle: {
            color: '#fff'
          },
          itemWidth: 16,
          itemHeight: 16
        },
        series: [
          {
            name: data[1].name,
            type: 'pie',
            clockWise: false,
            radius: ['50%', '58%'],
            center: ['40%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(9,84,255,1)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(59,155,252,1)' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                labelLine: {
                  show: false
                },
                shadowBlur: 40,
                borderWidth: 10,
                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
              }
            },
            hoverAnimation: false,
            startAngle: 90,
            data: [
              {
                value: data[1].value,
                name: data[1].name,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: 'rgba(9,84,255,1)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(59,155,252,1)'
                        }
                      ]
                    )
                  }
                }
              },
              {
                value: 100 - data[1].value,
                name: '',
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: data[2].name,
            type: 'pie',
            clockWise: false,
            radius: ['36%', '44%'],
            center: ['40%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(187,231,94,1)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(20,231,178,1)' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                labelLine: {
                  show: false
                },
                shadowBlur: 40,
                borderWidth: 10,
                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
              }
            },
            hoverAnimation: false,
            startAngle: 90,
            data: [
              {
                value: data[2].value,
                name: data[2].name,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,

                          color: 'rgba(187,231,94,1)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(20,231,178,1)'
                        }
                      ]
                    )
                  }
                }
              },
              {
                value: 100 - data[2].value,
                name: '',
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: data[0].name,
            type: 'pie',
            clockWise: false,
            radius: ['22%', '30%'],
            center: ['40%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(244,199,0,1)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(255,135,46,1)' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                labelLine: {
                  show: false
                },
                shadowBlur: 40,
                borderWidth: 10,
                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
              }
            },
            hoverAnimation: false,
            startAngle: 90,
            label: {
              borderRadius: '6'
            },
            data: [
              {
                value: data[0].value,
                name: data[0].name,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: 'rgba(244,199,0,1)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(255,135,46,1)'
                        }
                      ]
                    )
                  }
                }
              },
              {
                value: 100 - data[0].value,
                name: '',
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      }
      firstPie.setOption(pieOption)
    },
    drawListTwo(data, dataName) {
      let secondPie = this.$echarts.init(document.getElementById('second-pie'))
      var secondOption = {
        title: {
          text: '车辆类型分布',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 24
          },
          orient: 'vertical', //垂直显示
          x: '20%', //居右显示
          padding: [15, 0]
        },
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0,162,245,1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(1,194,235,1)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(244,68,114,1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(123,51,207,1)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        ],
        tooltip: {
          // trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          y: 'center',
          textStyle: {
            color: '#fff'
          },
          itemWidth: 16,
          itemHeight: 16,
          data: dataName
        },
        grid: {
          bottom: 10
        },
        series: [
          {
            name: '车辆类型分布',
            type: 'pie',
            center: ['40%', '50%'],
            radius: ['60%', '48%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              color: '#fff',
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
          }
        ]
      }
      secondPie.setOption(secondOption)
    }
  }
}
</script>

<style lang="less" scoped>
#first-pie,
#second-pie {
  width: 100%;
  height: 100%;
}
</style>
