<template>
  <div class="province-map">
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
import entrepotApi from '@/api/entrepot'
export default {
  name: 'province-map',
  data() {
    return {
      name: '',
      list: []
    }
  },
  computed: {
    province() {
      const PROVINCE_AND_ID = [
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
      let province = {
        ...PROVINCE_AND_ID.find(item => {
          return item.name === this.name
        })
      }
      return province
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let { success, list, name } = await this.fetch()
      if (success) {
        this.list = list
        this.name = name.replace(/省|市/g, '')
        this.render()
      }
    },

    async fetch() {
      let {
        success,
        data: { data }
      } = await entrepotApi.getBaBiz()

      let name

      if (data.length) {
        name = data[0].province
        // for (var i = 0; i < data.length; i++) {
        //   name = data[i].province
        // }
      } else {
        name = '浙江省'
      }
      return { success, list: data, name }
    },

    getProvinceGeo() {
      return import(`@/assets/geometryProvince/${this.province.id}.json`).then(
        res => {
          return res
        }
      )
    },

    async initMap() {
      let provinceGeo = await this.getProvinceGeo()
      this.$echarts.registerMap(this.province.id, provinceGeo)

      return provinceGeo.features.map(item => {
        let city = item.properties
        return {
          name: city.name,
          coord: city.cp,
          symbolOffset: [0, 15]
        }
      })
    },

    initCityPointSeries(points) {
      return [
        {
          name: this.province.name,
          type: 'map',
          geoIndex: 0,
          map: this.province.id,
          silent: true,
          markPoint: {
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: 'rgba(199,255,52,1)'
            },
            data: points
          }
        }
      ]
    },

    initCustomPointSeries(points = []) {
      let symbolPoints = this.list.map(item => {
        return {
          coord: [item.longitude, item.latitude],
          zlevel: 9,
          symbolOffset: [0, -15],
          tooltip: {
            formatter() {
              return `
                ${item.fullName}<br/>
                地址：${item.fullAddress}<br/>
                仓库数量：${item.stockCount}<br/>
                车辆数量：${item.carCount}<br/>
                监控状态: ${item.accessName}
              `
            }
          }
        }
      })

      let carImage = require('../../assets/img/qi1.png')

      return [
        {
          name: this.province.name,
          type: 'map',
          geoIndex: 0,
          map: this.province.id,
          markPoint: {
            symbol: `image://${carImage}`,
            symbolSize: 40,
            value: Math.random() * 1000,

            data: symbolPoints
          }
        }
      ]
    },

    async render() {
      let elem = this.$refs.map
      let mapEcharts = this.$echarts.init(elem)
      let cityPoints = await this.initMap()

      let defaultOpt = {
        title: {
          show: true,
          text: '各地区企业分布地图',
          bottom: 39,
          right: 18,
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 100
          }
        },
        tooltip: {
          show: true
        },
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          color: ['#fff', '#0000ff', '#000000']
        },
        geo: {
          map: this.province.id,
          // aspectScale: 1,
          left: 0,
          right: 20,
          top: 10,
          bottom: 20,
          zoom: 1,
          roam: true,
          silent: true,
          label: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          itemStyle: {
            borderColor: 'rgba(13, 110, 213, 1)',
            borderWidth: 2,
            areaColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0,13,46,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,29,71,1)'
                }
              ],
              globalCoord: false
            },
            shadowColor: 'rgba(13, 110, 213, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: null
        }
      }
      let seriesOpt = {
        series: [
          ...this.initCityPointSeries(cityPoints),
          ...this.initCustomPointSeries()
        ]
      }

      mapEcharts.setOption({
        ...defaultOpt,
        ...seriesOpt
      })
    }
  }
}
</script>

<style lang="less" scoped>
.province-map,
.map {
  width: 100%;
  height: 100%;
}
</style>

