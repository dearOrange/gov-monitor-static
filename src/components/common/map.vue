<template>
    <div :id="firstId"></div>
</template>

<script>
import babizApi from '../../api/login'
export default {
  name: 'FirstMap',
  props: {
    firstId: {
      type: String
    }
  },
  mounted() {
    babizApi.getBaBiz().then(res => {
      if (res.success) {
        let data = res.data.data
        console.log(data)
      }
    })
    this.drawMapOne()
  },
  methods: {
    drawMapOne() {
      let firstMap = this.$echarts.init(document.getElementById('first-map'))
      var mapList = [
        {
          id: '11',
          name: '北京'
        },
        {
          id: '12',
          name: '天津'
        },
        {
          id: '13',
          name: '河北'
        },
        {
          id: '14',
          name: '山西'
        },
        {
          id: '15',
          name: '内蒙'
        },
        {
          id: '21',
          name: '辽宁'
        },
        {
          id: '22',
          name: '吉林'
        },
        {
          id: '23',
          name: '黑龙江'
        },
        {
          id: '31',
          name: '上海'
        },
        {
          id: '32',
          name: '江苏'
        },
        {
          id: '33',
          name: '浙江'
        },
        {
          id: '34',
          name: '安徽'
        },
        {
          id: '35',
          name: '福建'
        },
        {
          id: '36',
          name: '江西'
        },
        {
          id: '37',
          name: '山东'
        },
        {
          id: '41',
          name: '河南'
        },
        {
          id: '42',
          name: '湖北'
        },
        {
          id: '43',
          name: '湖南'
        },
        {
          id: '44',
          name: '广东'
        },
        {
          id: '45',
          name: '广西'
        },
        {
          id: '46',
          name: '海南'
        },
        {
          id: '50',
          name: '重庆'
        },
        {
          id: '51',
          name: '四川'
        },
        {
          id: '52',
          name: '贵州'
        },
        {
          id: '53',
          name: '云南'
        },
        {
          id: '54',
          name: '西藏'
        },
        {
          id: '61',
          name: '陕西'
        },
        {
          id: '62',
          name: '甘肃'
        },
        {
          id: '63',
          name: '青海'
        },
        {
          id: '64',
          name: '宁夏'
        },
        {
          id: '65',
          name: '新疆'
        },
        {
          id: '71',
          name: '台湾'
        },
        {
          id: '81',
          name: '香港'
        },
        {
          id: '82',
          name: '澳门'
        }
      ]

      function getProId(name) {
        for (let i in mapList) {
          if (mapList[i].name == name) {
            return mapList[i].id
          }
        }
      }
      function getCityId(geoJson, name) {
        for (let i in geoJson.features) {
          if (geoJson.features[i].properties.name == name) {
            return geoJson.features[i].properties.id + '00'
          }
        }
      }
      firstMap.showLoading()
      firstMap.hideLoading()
      // this.$echarts.registerMap('china', chinaJson)
      firstMap.setOption({
        geo: {
          map: 'china',
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#3ebee6' //省份字体颜色
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            roam: true,
            type: 'scatter',
            coordinateSystem: 'geo'
          }
        ]
      })
      var that = this
      firstMap.on('click', function(params) {
        firstMap.showLoading()
        let jsonData = require(`@/assets/geometryProvince/${getProId(
          params.name
        )}.json`)
        firstMap.hideLoading()
        that.$echarts.registerMap(getProId(params.name), jsonData)
        firstMap.setOption({
          geo: {
            map: getProId(params.name),
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#3ebee6' //省份字体颜色
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              roam: true,
              type: 'scatter',
              coordinateSystem: 'geo'
            }
          ]
        })
      })
    },
    drawMapTwo() {
      let firstMap = this.$echarts.init(document.getElementById('second-map'))
      var mapList = [
        {
          id: '11',
          name: '北京'
        },
        {
          id: '12',
          name: '天津'
        },
        {
          id: '13',
          name: '河北'
        },
        {
          id: '14',
          name: '山西'
        },
        {
          id: '15',
          name: '内蒙'
        },
        {
          id: '21',
          name: '辽宁'
        },
        {
          id: '22',
          name: '吉林'
        },
        {
          id: '23',
          name: '黑龙江'
        },
        {
          id: '31',
          name: '上海'
        },
        {
          id: '32',
          name: '江苏'
        },
        {
          id: '33',
          name: '浙江'
        },
        {
          id: '34',
          name: '安徽'
        },
        {
          id: '35',
          name: '福建'
        },
        {
          id: '36',
          name: '江西'
        },
        {
          id: '37',
          name: '山东'
        },
        {
          id: '41',
          name: '河南'
        },
        {
          id: '42',
          name: '湖北'
        },
        {
          id: '43',
          name: '湖南'
        },
        {
          id: '44',
          name: '广东'
        },
        {
          id: '45',
          name: '广西'
        },
        {
          id: '46',
          name: '海南'
        },
        {
          id: '50',
          name: '重庆'
        },
        {
          id: '51',
          name: '四川'
        },
        {
          id: '52',
          name: '贵州'
        },
        {
          id: '53',
          name: '云南'
        },
        {
          id: '54',
          name: '西藏'
        },
        {
          id: '61',
          name: '陕西'
        },
        {
          id: '62',
          name: '甘肃'
        },
        {
          id: '63',
          name: '青海'
        },
        {
          id: '64',
          name: '宁夏'
        },
        {
          id: '65',
          name: '新疆'
        },
        {
          id: '71',
          name: '台湾'
        },
        {
          id: '81',
          name: '香港'
        },
        {
          id: '82',
          name: '澳门'
        }
      ]

      function getProId(name) {
        for (let i in mapList) {
          if (mapList[i].name == name) {
            return mapList[i].id
          }
        }
      }
      function getCityId(geoJson, name) {
        for (let i in geoJson.features) {
          if (geoJson.features[i].properties.name == name) {
            return geoJson.features[i].properties.id + '00'
          }
        }
      }
      firstMap.showLoading()
      firstMap.hideLoading()
      // this.$echarts.registerMap('china', chinaJson)
      firstMap.setOption({
        geo: {
          map: 'china',
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#3ebee6' //省份字体颜色
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            roam: true,
            type: 'scatter',
            coordinateSystem: 'geo'
          }
        ]
      })
      var that = this
      firstMap.on('click', function(params) {
        firstMap.showLoading()
        let jsonData = require(`@/assets/geometryProvince/${getProId(
          params.name
        )}.json`)
        firstMap.hideLoading()
        that.$echarts.registerMap(getProId(params.name), jsonData)
        firstMap.setOption({
          geo: {
            map: getProId(params.name),
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#3ebee6' //省份字体颜色
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              roam: true,
              type: 'scatter',
              coordinateSystem: 'geo'
            }
          ]
        })
      })
    },
    drawMapThree() {
      let firstMap = this.$echarts.init(document.getElementById('third-map'))
      var mapList = [
        {
          id: '11',
          name: '北京'
        },
        {
          id: '12',
          name: '天津'
        },
        {
          id: '13',
          name: '河北'
        },
        {
          id: '14',
          name: '山西'
        },
        {
          id: '15',
          name: '内蒙'
        },
        {
          id: '21',
          name: '辽宁'
        },
        {
          id: '22',
          name: '吉林'
        },
        {
          id: '23',
          name: '黑龙江'
        },
        {
          id: '31',
          name: '上海'
        },
        {
          id: '32',
          name: '江苏'
        },
        {
          id: '33',
          name: '浙江'
        },
        {
          id: '34',
          name: '安徽'
        },
        {
          id: '35',
          name: '福建'
        },
        {
          id: '36',
          name: '江西'
        },
        {
          id: '37',
          name: '山东'
        },
        {
          id: '41',
          name: '河南'
        },
        {
          id: '42',
          name: '湖北'
        },
        {
          id: '43',
          name: '湖南'
        },
        {
          id: '44',
          name: '广东'
        },
        {
          id: '45',
          name: '广西'
        },
        {
          id: '46',
          name: '海南'
        },
        {
          id: '50',
          name: '重庆'
        },
        {
          id: '51',
          name: '四川'
        },
        {
          id: '52',
          name: '贵州'
        },
        {
          id: '53',
          name: '云南'
        },
        {
          id: '54',
          name: '西藏'
        },
        {
          id: '61',
          name: '陕西'
        },
        {
          id: '62',
          name: '甘肃'
        },
        {
          id: '63',
          name: '青海'
        },
        {
          id: '64',
          name: '宁夏'
        },
        {
          id: '65',
          name: '新疆'
        },
        {
          id: '71',
          name: '台湾'
        },
        {
          id: '81',
          name: '香港'
        },
        {
          id: '82',
          name: '澳门'
        }
      ]

      function getProId(name) {
        for (let i in mapList) {
          if (mapList[i].name == name) {
            return mapList[i].id
          }
        }
      }
      function getCityId(geoJson, name) {
        for (let i in geoJson.features) {
          if (geoJson.features[i].properties.name == name) {
            return geoJson.features[i].properties.id + '00'
          }
        }
      }
      firstMap.showLoading()
      firstMap.hideLoading()
      // this.$echarts.registerMap('china', chinaJson)
      firstMap.setOption({
        geo: {
          map: 'china',
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#3ebee6' //省份字体颜色
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            roam: true,
            type: 'scatter',
            coordinateSystem: 'geo'
          }
        ]
      })
      var that = this
      firstMap.on('click', function(params) {
        firstMap.showLoading()
        let jsonData = require(`@/assets/geometryProvince/${getProId(
          params.name
        )}.json`)
        firstMap.hideLoading()
        that.$echarts.registerMap(getProId(params.name), jsonData)
        firstMap.setOption({
          geo: {
            map: getProId(params.name),
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#3ebee6' //省份字体颜色
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              roam: true,
              type: 'scatter',
              coordinateSystem: 'geo'
            }
          ]
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
#first-map,
#second-map,
#third-map {
  width: 100%;
  height: 100%;
}
</style>
