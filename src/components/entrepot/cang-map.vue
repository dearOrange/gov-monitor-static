<template>
  <div class="cang-map">
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
import entrepotApi from '@/api/entrepot'
export default {
  name: 'cang-map',
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
      } = await entrepotApi.getBaStock()

      let name

      if (data.length) {
        name = data[0].province
        // console.log(data)
        // for (var i = 0; i < data.length; i++) {
        //   name = data[i].province
        // }
        // name = '浙江省'
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
                ${item.stockName} | ${item.stockTypeName}<br/>
                仓库面积：${item.stockAcreage}㎡<br/>
                存货容积：${item.stockVolume}m³<br/>
                温度达标率：${(item.tempReachPercent * 100).toFixed(2)}%<br/>
                所属企业：${item.bizUnitName}<br/>
                详细地址：${item.fullAddress}<br/>
                监控状态: ${item.accessName}
              `
            }
          }
        }
      })
      let path =
        'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'

      let carImage = require('../../assets/img/cang1.png')
      return [
        {
          name: this.province.name,
          type: 'map',
          geoIndex: 0,
          map: this.province.id,
          markPoint: {
            symbol: `image://${carImage}`,
            symbolSize: 28,
            value: Math.random() * 1000,
            itemStyle: {
              color: 'yellow'
            },
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
          text: '各地区仓库分布地图',
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
.cang-map,
.map {
  width: 100%;
  height: 100%;
}
</style>

