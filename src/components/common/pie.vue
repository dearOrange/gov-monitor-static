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

        this.baCarList = data.baCarList.map(el => {
          el.accessEatio = (el.accessEatio * 100).toFixed(1)
          el.carTemperatureTypeName = el.carTemperatureTypeName
          return {
            value: el.accessEatio,
            name: el.carTemperatureTypeName
          }
        })
        this.drawListOne(this.baCarList)
        this.drawListTwo(this.baCars, this.baCarsName)
      }
    })
  },
  methods: {
    drawListOne(data) {
      let firstPie = this.$echarts.init(document.getElementById('first-pie'))
      var color = [
        '#fb734e',
        '#e32f46',
        '#94d96c',
        '#0bbcb7',
        '#1a9bfc',
        '#7049f0'
      ]
      var dataStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowBlur: 40,
          borderWidth: 10,
          shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
        }
      }
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
        backgroundColor: '#142058',
        title: {
          text: '车辆温控类型分布',
          orient: 'vertical', //垂直显示
          x: '10%',
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
          x: 'right',
          y: 'center',
          itemGap: 20,
          data: ['冷冻', '冷藏', '常温'],
          textStyle: {
            color: '#fft'
          }
        },
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: false,
            radius: [114, 128],
            center: ['40%', '50%'],
            itemStyle: dataStyle,
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
                          color: color[0]
                        },
                        {
                          offset: 1,
                          color: color[1]
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
          },
          {
            name: 'Line 2',
            type: 'pie',
            clockWise: false,
            radius: [74, 88],
            center: ['40%', '50%'],
            itemStyle: dataStyle,
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
                          color: color[2]
                        },
                        {
                          offset: 1,
                          color: color[3]
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
            name: 'Line 3',
            type: 'pie',
            clockWise: false,
            radius: [34, 48],
            center: ['40%', '50%'],
            itemStyle: dataStyle,
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

                          color: color[4]
                        },
                        {
                          offset: 1,
                          color: color[5]
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          textStyle: {
            color: '#fff'
          },
          data: dataName
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['40%', '50%'],
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              color: '#fff',
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
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
