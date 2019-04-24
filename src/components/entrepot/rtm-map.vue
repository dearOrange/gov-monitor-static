<template>
  <div class="rtm-map">
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
import entrepotApi from '@/api/entrepot'
export default {
  name: 'rtm-map',
  data() {
    return {
      name: '',
      list: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let { success, list } = await this.fetch()
      if (success) {
        this.list = list
        this.render()
      }
    },

    loadMap(pid) {
      let ids = [
        '11',
        '12',
        '13',
        '14',
        '15',
        '21',
        '22',
        '23',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '50',
        '51',
        '52',
        '53',
        '54',
        '61',
        '62',
        '63',
        '64',
        '65',
        '71',
        '81',
        '82'
      ]
      let customChinaGeo = ids.map(id => {
        return this.getProvinceGeo(id)
      })

      return Promise.all(customChinaGeo)
    },

    getProvinceGeo(pid) {
      return import(`@/assets/geometryProvince/${pid}.json`)
    },

    async fetch() {
      let {
        success,
        data: { data }
      } = await entrepotApi.getBaCar()

      return { success, list: data }
    },

    initCityPointSeries(points) {
      return [
        {
          // name: this.province.name,
          type: 'map',
          geoIndex: 0,
          map: 'JK-china',
          // silent: true,
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
                车牌号：${item.plateNumber}<br/>
                所属企业：${item.bizUnitName}<br/>
                当前位置：${
                  item.fullAddress === undefined ? '' : item.fullAddress
                }<br/>
                车辆类型: ${item.carTypeName}  | 温控类型: ${
                item.carTemperatureTypeName
              }<br/>
                设计温度：${item.temperatureLowerLimit}-${
                item.temperatureUpperLimit
              }<br/>
                当前温度：${item.temperature} | 温度达标率：${
                item.tempReachPercent === null ? '' : item.tempReachPercent
              }<br/>
                车辆载重：${item.loadCapacity}吨 | 承载体积：${
                item.loadVolume
              }m³<br/>
                联系人：${item.contactName} | 联系电话：${item.mobile}<br/>
                状态: ${
                  item.temperatureMonitoring === 1 ? '温度监控中' : ''
                }, ${item.locationMonitoring === 1 ? '定位监控中' : ''}, ${
                item.tmsMonitoring === 1 ? 'TMS系统监控中' : ''
              }
              `
            }
          }
        }
      })
      // let path =
      //   'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'

      let imgCar = require('../../assets/img/car.png')
      return [
        {
          // name: this.province.name,
          type: 'map',
          geoIndex: 0,
          map: 'JK-china',
          markPoint: {
            symbol: `image://${imgCar}`,
            symbolSize: 24,
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
      let mapGeo = await this.loadMap()
      let features = mapGeo.reduce((arr, item) => {
        return [...arr, ...item.features]
      }, [])

      let cityPoints = features
        .filter(item => {
          let city = item.properties
          return !!city.cp
        })
        .map(item => {
          let city = item.properties
          return {
            name: city.name,
            coord: city.cp,
            symbolOffset: [0, 15]
          }
        })
      // console.log(this.initCityPointSeries(cityPoints))
      this.$echarts.registerMap('JK-china', {
        type: 'JK-china',
        size: '5000',
        features: features
      })

      let defaultOpt = {
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
          map: 'JK-china',
          zoom: 20,
          roam: true,
          // silent: true,
          label: {
            show: true,
            textStyle: {
              color: 'rgba(128, 128, 128, 0.3)'
            }
          },
          itemStyle: {
            borderColor: 'rgba(79, 79, 79, 1)',
            borderWidth: 1,
            areaColor: 'rgba(0, 7, 46, 1)'
            // normal: {
            //   areaColor: 'rgba(0, 7, 46, 1)',
            //   label: {
            //     show: true,
            //     textStyle: {
            //       color: 'rgba(128, 128, 128, 0.3)'
            //     }
            //   }
            // }
            // emphasis: null
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

      // console.log(cityPoints)

      mapEcharts.setOption({
        ...defaultOpt,
        ...seriesOpt
      })

      mapEcharts.on('mouseover', (...args) => {})
    }
  }
}
</script>

<style lang="less" scoped>
.rtm-map,
.map {
  width: 100%;
  height: 100%;
}
</style>

