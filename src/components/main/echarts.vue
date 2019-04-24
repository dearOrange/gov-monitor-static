<template>
    <div class="echartsContainer">
        <div class="first_container">
            <div class="line_chart_header">
                <ul>
                    <li><span>{{monthlyOutput}}</span><span>30天总出货量(吨)</span></li>
                    <li><span>{{averageDailyShipments}}</span><span>日平均出货量(吨)</span></li>
                </ul>
            </div>
            <div class="line_chart_graph">
                <div class="line_chart_title">
                    <i class="icon icon-trend"></i>
                    <span>总出货量走势</span>
                </div>
                <div id="myCharts" style="width:100%;height:100%;"></div>
            </div>
        </div>
        <div class="line"></div>
        <div class="second_container">
            <h2><i class="icon icon-goodsnum"></i><span>30天大类产品出货量</span></h2>
            <ul class="lines_progress">
              <li v-for="(item, index) in biCategoryDatas" :key="index">
                <div class="item">
                  <label>{{item.categoryName}}</label>
                  <span>{{item.total}}吨</span>
                  <el-progress class="progress_img" :show-text="false" :text-inside="true" :stroke-width="18" :percentage="item.percentage"></el-progress>
                </div>
              </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'EchartsContainer',
  props: {
    biMonitorDatas: {
      type: Array
    },
    biCategoryDatas: {
      type: Array
    },
    monthlyOutput: {
      type: Number
    },
    averageDailyShipments: {
      type: Number
    },
    biMonitorNum: {
      type: Array
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.drawList()
  },
  methods: {
    drawList() {
      let myEcharts = this.$echarts.init(document.getElementById('myCharts'))
      myEcharts.setOption({
        tooltip: {
          trigger: 'axis'
          // formatter: '{value}万'
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          x: 40,
          //		            x2:40,
          y: 25
          // width: 400
        },
        xAxis: {
          // show: false,
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 28,
            showMinLabel: true
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          data: this.biMonitorDatas
        },
        yAxis: {
          show: false
          // type: 'value',
          // axisLine: {
          //   lineStyle: {
          //     color: '#fff'
          //   }
          // },
          // axisLabel: {
          //   formatter: '{value} °C'
          // },
          // splitLine: {
          //   show: false
          // }
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            symbol: 'none', //这句就是去掉点的
            smooth: true, //这句就是让曲线变平滑的
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0)',
                lineStyle: {
                  color: '#3BEFF5'
                }
              }
            },
            data: this.biMonitorNum,
            // data: [1, 2, 3, 4],
            markPoint: {
              symbol: 'pin',
              label: {
                show: true,
                position: 'insideTop',
                color: '#3BEFF5'
              },
              data: [
                {
                  type: 'max',
                  name: '最大值',
                  symbol: 'circle'
                },
                {
                  type: 'min',
                  name: '最小值',
                  symbol: 'circle'
                }
              ]
            },
            // markLine: {
            //   data: [{ type: "average", name: "平均值" }]
            // },
            areaStyle: {
              color: '#3BEFF5'
            }
          }
          // {
          //   name: '最低气温',
          //   type: 'line',
          //   symbol: 'none', //这句就是去掉点的
          //   smooth: true, //这句就是让曲线变平滑的
          //   data: [
          //     1,
          //     -2,
          //     2,
          //     5,
          //     3,
          //     2,
          //     0,
          //     1,
          //     -2,
          //     2,
          //     5,
          //     3,
          //     2,
          //     0,
          //     1,
          //     -2,
          //     2,
          //     5,
          //     3,
          //     2,
          //     0,
          //     1,
          //     -2,
          //     2,
          //     5,
          //     3,
          //     2,
          //     0,
          //     3,
          //     2,
          //     0
          //   ],
          //   // markPoint: {
          //   //   data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
          //   // },
          //   // markLine: {
          //   //   data: [
          //   //     { type: "average", name: "平均值" },
          //   //     [
          //   //       {
          //   //         symbol: "none",
          //   //         x: "90%",
          //   //         yAxis: "max"
          //   //       },
          //   //       {
          //   //         symbol: "circle"
          //   //         label: {
          //   //           normal: {
          //   //             position: "start",
          //   //             formatter: "最大值"
          //   //           }
          //   //         },
          //   //         type: "max",
          //   //         name: "最高点"
          //   //       }
          //   //     ]
          //   //   ]
          //   // },
          //   areaStyle: {}
          // }
        ]
      })
      myEcharts.on('click', function(p) {
        // console.log(p)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.echartsContainer {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .first_container {
    width: 100%;
    height: 51%;
    background: rgba(94, 109, 240, 0.1);
    border-radius: 4px;
    // margin: 0 0 3% 3%;
    padding: 10px 0 0 30px;
    .line_chart_header {
      height: 28%;
      ul {
        display: -webkit-flex;
        li {
          flex: 1;
          span {
            display: block;
            margin-top: 13px;
            &:first-of-type {
              font-size: 40px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: rgba(245, 59, 186, 1);
              line-height: 40px;
            }
            &:last-of-type {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 14px;
            }
          }
        }
      }
    }
    .line_chart_graph {
      height: 72%;
      .line_chart_title {
        // margin-top: 5px;
        i {
          float: left;
        }
        span {
          float: left;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
          margin-left: 10px;
          margin-top: 5px;
        }
      }
    }
  }
  .second_container {
    width: 100%;
    height: 48%;
    background: rgba(94, 109, 240, 0.1);
    border-radius: 4px;
    // margin: 0 0 3% 3%;
    padding: 20px 0 0 30px;
    display: flex;
    flex-direction: column;
    h2 {
      i {
        float: left;
      }
      span {
        float: left;
        font-size: 22px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(200, 210, 255, 1);
        line-height: 22px;
        margin: 4px 6px 0;
      }
    }
    ul.lines_progress {
      flex: 1 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 26px 0 24px 0;
      > li {
        flex: 1 auto;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        // margin-top: 10%;
        span {
          position: absolute;
          top: 0;
          // left: 0;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        > .item {
          overflow: hidden;
        }
        label {
          float: left;
          width: 54px;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
        }
        .progress_img {
          float: left;
          width: 76% !important;
          margin-top: 0;
          margin-left: 19px;
          height: 14px !important;
        }
      }
    }
  }
}
@media only screen and (max-width: 1640px) {
  .echartsContainer {
    .first_container {
      .line_chart_header {
        ul {
          li {
            span {
              &:first-of-type {
                font-size: 30px;
                line-height: 30px;
              }
              &:last-of-type {
                font-size: 12px;
                line-height: 12px;
              }
            }
          }
        }
      }
    }
    .second_container {
      h2 {
        font-size: 16px;
        line-height: 16px;
      }
      .lines_progress {
        div {
          label {
            font-size: 14px;
            line-height: 14px;
          }
          .progress_img {
            width: 68% !important;
          }
        }
      }
    }
  }
}
</style>
<style>
.el-progress-bar__outer {
  background-color: rgba(55, 51, 135, 1) !important;
  height: 14px !important;
}
.el-progress-bar__inner {
  height: 14px !important;
  background: linear-gradient(
    90deg,
    rgba(230, 39, 255, 1),
    rgba(39, 254, 246, 1)
  ) !important;
}
</style>

