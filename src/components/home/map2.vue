<template>
  <div class="map">
    <div v-if="isShowArea" class="content">
      <span>{{sendArea}} → {{receiverArea}} 丨 {{productName}} 丨 {{productNum}}吨</span>
    </div>
    <div class="map-content" id="charts_map"></div>
  </div>
</template>
<script>
import orderApi from '@/api/home'
import { differenceWith } from 'lodash'
export default {
  name: 'emap',
  mounted() {
    let mapContainer = document.getElementById('charts_map')
    // console.log(mapContainer.clientWidth)
    this.echartInst = this.$echarts.init(mapContainer)

    this.getList()
    window.setInterval(() => {
      this.getList()
    }, 30000)
  },
  data() {
    return {
      sendArea: null,
      receiverArea: null,
      productName: null,
      productNum: null,
      isShowArea: false,
      isFirst: true,

      cacheArr: null,
      showArr: null,
      echartInst: null
    }
  },
  methods: {
    async getList() {
      // this.oldArr = this.newArr
      let {
        success,
        data: { data }
      } = await orderApi.getOrder()
      if (success) {
        let ccA = data.reverse().map(ele => {
          let reaciveArr
          reaciveArr = [
            { name: ele.senderCity, provice: ele.senderProvince },
            {
              name: ele.receiverCity,
              provice: ele.receiverProvince,
              value: ele.salesWeight,
              id: ele.orderUkid,
              number: ele.salesWeight,
              productName: ele.productName
            }
          ]
          return reaciveArr
        })

        let geoCoordMap = data.reduce((acc, item) => {
          let cp, cx
          cp = [item.senderLongitude, item.senderLatitude]
          cx = [item.receiverLongitude, item.receiverLatitude]
          let name1 = item.senderCity,
            name2 = item.receiverCity

          acc[name1] || (acc[name1] = cp)
          acc[name2] || (acc[name2] = cx)

          return acc
        }, {})
        // this.newArr = ccA
        let hasNew = false
        let showArr = ccA.map((item, index) => {
          let isNew = false
          if (this.cacheArr) {
            let foundItem = this.cacheArr.find(cachedItem => {
              return cachedItem[1].id === item[1].id
            })

            if (!foundItem) {
              // console.log('发现新数据')
              isNew = true
            }
          }
          if (isNew) {
            hasNew = true
            item[1].new = true
            // console.log(item)
            this.isShowArea = item[1].new = true
            this.sendArea = item[1].new
              ? item[0].provice + '' + item[0].name
              : ''
            this.receiverArea = item[1].new
              ? item[1].provice + '' + item[1].name
              : ''
            this.productName = item[1].new ? item[1].productName : ''
            this.productNum = item[1].new ? item[1].number : ''
          }

          return item
        })

        // let index
        // if (!hasNew) {
        //   index = Math.floor(Math.random() * 20)
        //   showArr[index][1].new = true
        // }

        // this.showArr = [...showArr]

        if (this.isFirst || hasNew) {
          if (this.isFirst) {
            this.isFirst = false
          }
          this.cacheArr = ccA
          this.drawMap(showArr, geoCoordMap)
        }
      }
    },
    drawMap(BJData, geoCoordMap) {
      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = geoCoordMap[dataItem[0].name]
          var toCoord = geoCoordMap[dataItem[1].name]

          let randomV = Math.floor(Math.random() * 10)
          // console.log(dataItem[1])
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value,
              lineStyle: {
                normal: {
                  color: dataItem[1].new ? 'rgba(255, 255, 0, 1)' : '#46bee9'
                }
              }
            })
          }
        }
        return res
      }

      var color = ['#a6c84c', '#ffa022', '#46bee9']
      var series = []
      var that = this

      ;[BJData].forEach(function(item, i) {
        series.push(
          {
            // name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: '#46bee9',
                width: 0,
                curveness: 0.2
              }
            },
            data: convertData(item)
          },
          {
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0
              // symbol: planePath,
              // symbolSize: 15
            },
            lineStyle: {
              normal: {
                color: '#46bee9',
                width: 3,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: convertData(item)
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: 20,
            // function(val) {
            //   return val[2] / 8
            // },
            itemStyle: {
              normal: {
                color: '#46bee9'
              }
            },
            data: item.map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              }
            })
          }
        )
      })
      // console.log(series)

      // let mapContainer = document.getElementById('charts_map')
      // console.log(mapContainer.clientWidth)
      let charts_map = this.echartInst
      var center1 = sessionStorage.getItem('center1')
      var center2 = sessionStorage.getItem('center2')
      charts_map.setOption({
        backgroundColor: '#000D2E',
        // title: {
        // text: "模拟迁徙",
        // subtext: "数据纯属虚构",
        // left: "center",
        // textStyle: {
        //   color: "#fff"
        // }
        // },
        tooltip: {
          trigger: 'item',
          alwaysShowContent: false,
          formatter: function(params, ticket, callback) {
            //   console.log(params);
            if (params.seriesType == 'effectScatter') {
              return '线路：' + params.data.name + '' + params.data.value[2]
            } else if (params.seriesType == 'lines') {
              return (
                params.data.fromName +
                '->' +
                params.data.toName +
                '<br />' +
                params.data.value +
                '吨'
              )
            } else {
              return params.name
            }
          }
        },
        // legend: {
        //   orient: "vertical",
        //   top: "bottom",
        //   left: "right",
        //   data: ["北京 Top10", "上海 Top10", "广州 Top10"],
        //   textStyle: {
        //     color: "#fff"
        //   },
        //   selectedMode: "multiple"
        // },
        geo: {
          map: 'china',
          label: {
            normal: {
              show: true, //省份名称
              color: '#fff'
            },
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          roam: true,
          center: [center1, center2],
          zoom: 2,
          itemStyle: {
            normal: {
              // areaColor: '#001D47',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#001D47' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#000D2E' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              borderColor: '#404a59'
            },
            emphasis: {
              areaColor: '#000D2E'
            }
          }
        },
        series: series
      })
    }
  }
}
</script>
<style lang="less" scoped>
.map {
  padding: 0 10px;
  height: 100%;
  position: relative;
  .map-content {
    width: 100%;
    height: 100%;
  }
}
.content {
  position: absolute;
  left: 42px;
  top: 52px;
  z-index: 99;
  padding: 15px 29px;
  background: rgba(255, 255, 225, 0.43);
  border: 2px solid rgba(255, 255, 255, 0.43);
  border-radius: 25px;
  & > span {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 0, 1);
  }
}
</style>
