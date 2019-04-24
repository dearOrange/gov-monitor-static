<template>
    <div class="section_list_container">
        <div class="info_first">
          <router-link to="/entrepot">
            <div class="info_list_container" >
                <div class="list_header">
                    <i class="icon icon-company"></i>
                    <span>企业信息</span>
                </div>
                <div class="list_number">
                    <dl>
                        <dt>{{orgNum}}</dt>
                        <dd>企业总数</dd>
                    </dl>
                    <dl>
                        <dt>{{orgMonitorNum}}</dt>
                        <dd>已接入数量</dd>
                    </dl>
                    <dl>
                        <dt></dt>
                        <dd></dd>
                    </dl>
                </div>
            </div>
            </router-link>
            <router-link to="/bulktemp">
            <div class="info_list_container">
                <div class="list_header">
                    <i class="icon icon-store"></i>
                    <span>仓库信息</span>
                </div>
                <div class="list_number">
                    <dl>
                        <dt>{{stockNum}}</dt>
                        <dd>企业总数</dd>
                    </dl>
                    <dl>
                        <dt>{{stockMonitorNum}}</dt>
                        <dd>已接入数量</dd>
                    </dl>
                    <dl>
                        <dt>{{stockTotalAcreage}}</dt>
                        <dd>仓库总容积（<span style="color:#00b8f9;">万m³</span>）</dd>
                    </dl>
                </div>
            </div>
            </router-link>
            <router-link to="/carinfo">
            <div class="info_list_container">
                <div class="list_header">
                    <i class="icon icon-car"></i>
                    <span>车辆信息</span>
                </div>
                <div class="list_number">
                    <dl>
                        <dt>{{carNum}}</dt>
                        <dd>企业总数</dd>
                    </dl>
                    <dl>
                        <dt>{{carMonitorNum}}</dt>
                        <dd>已接入数量</dd>
                    </dl>
                    <dl>
                        <dt>{{carOnlineTotal}}</dt>
                        <dd>在线数量</dd>
                    </dl>
                </div>
            </div>
            </router-link>
        </div>
        <div class="info_eachers_container">
          <ring :process="tracePercent" beginColor="#444FFF" endColor="#9836FB">
            <div class="ring-text">
              <i class="icon icon-gold"></i>
              <p>商品可溯源比例</p>
            </div>
          </ring>
          <ring :process="tempReachPercent" beginColor="#E94029" endColor="#FFC418">
            <div class="ring-text">
              <i class="icon icon-temperature"></i>
              <p>仓内温度达标率</p>
            </div>
          </ring>
        </div>
    </div>
</template>
<script>
import Ring from './ring'
export default {
  name: 'LeftNav',
  props: {
    orgNum: {
      type: String
    },
    orgMonitorNum: {
      type: String
    },
    stockNum: {
      type: String
    },
    stockMonitorNum: {
      type: String
    },
    stockTotalAcreage: {
      type: String
    },
    carNum: {
      type: String
    },
    carMonitorNum: {
      type: String
    },
    carOnlineTotal: {
      type: String
    },
    tracePercent: {
      type: String
    },
    tempReachPercent: {
      type: String
    }
  },
  components: {
    Ring
  },
  data() {
    return {
      leftNavData: [],
      isCollapse: false,
      ring1: 20
    }
  },
  mounted() {},
  methods: {
    open(msg) {
      //打开弹窗
      this.$alert(msg, '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$local.save('loginMsg', {})
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.section_list_container {
  color: #fff;
  height: 100%;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .info_first {
    height: 64%;
    background: rgba(94, 109, 240, 0.1);
    border-radius: 4px;
    .info_list_container {
      height: 33.3%;
      margin: 0 6%;
      border-bottom: 1px solid rgba(6, 8, 33, 1);
      &:last-of-type {
        border-bottom: 0;
      }
      .list_header {
        width: 100%;
        height: 30%;
        padding: 6% 0 7%;
        i {
          float: left;
        }
        span {
          float: left;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
      &:last-of-type {
        .list_header {
          i {
            margin-top: 6px;
          }
        }
      }
      .list_number {
        width: 100%;
        height: 56%;
        margin: 16px 0 0 6px;
        display: -webkit-flex;
        dl {
          flex: 1;
          height: 100%;
          text-align: center;
          dt {
            font-family: MicrosoftYaHei-Bold;
            color: rgba(0, 184, 249, 1);
            font-weight: bold;
            font-size: 40px;
            line-height: 40px;
            span {
              font-size: 18px;
              line-height: 18px;
              font-weight: 100;
              float: right;
              margin-top: 19px;
              margin-left: -19px;
            }
          }
          dd {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 14px;
            text-align: center;
            margin-top: 13px;
          }
        }
      }
      &:nth-of-type(2) {
        .list_number {
          dl {
            dt {
              color: rgba(232, 122, 9, 1);
            }
          }
        }
      }
      &:nth-of-type(3) {
        .list_number {
          dl {
            dt {
              color: rgba(110, 206, 96, 1);
            }
          }
        }
      }
    }
  }
  .info_line {
    height: 1%;
  }
  .info_eachers_container {
    height: 35%;
    background: rgba(94, 109, 240, 0.1);
    border-radius: 4px;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .bar_progress {
      flex: 1;
      position: relative;
      i {
        position: absolute;
        top: 52%;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      p {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(200, 210, 255, 1);
        line-height: 20px;
        margin-top: 18px;
      }
    }
    .ring {
      position: relative;
      height: 228px;
      .ring-text {
        position: absolute;
        bottom: 20px;
        width: 100%;
        p {
          margin-top: 20px;
        }
      }
    }
  }
}
@media only screen and (max-width: 1640px) {
  .section_list_container {
    .info_first {
      .info_list_container {
        .list_number {
          dl {
            /*margin-right:6%;*/
            dt {
              font-size: 28px;
              line-height: 28px;
              span {
                font-size: 14px;
                line-height: 14px;
                margin-top: 10px;
              }
            }
            dd {
              font-size: 12px;
              line-height: 12px;
            }
          }
        }
      }
    }
  }
}
</style>

