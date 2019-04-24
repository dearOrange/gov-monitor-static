<template>
    <div id="ranking-table">
        <table border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th>排名</th>
                    <th>地区</th>
                    <th>收货量（吨）</th>
                </tr>
            </thead>
            <tbody align="center">
                <tr v-for="(item, index) in areaData" :key="index">
                    <td><span :class="index == 0 ? 'mark_border_one' : (index== 1?'mark_border_two' : (index == 2 ? 'mark_border_three' : ''))">{{index+1}}</span></td>
                    <td>{{item.receiverCity}}</td>
                    <td>{{item.salesWeight}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import carinfoApi from '@/api/carinfo'
export default {
  data() {
    return {
      areaData: []
    }
  },
  mounted() {
    carinfoApi.getArea().then(({ success, data: { data } }) => {
      if (success) {
        this.areaData = data.slice(0, 10)
        let busArr = []
        busArr = data.map(ele => {
          return ele.receiverCity
        })
        busArr = busArr.slice(0, 3)
        this.bus.$emit('receiverCity', busArr)
      }
    })
  }
}
</script>

<style lang="less" scoped>
#ranking-table {
  width: 100%;
  height: 100%;
  background: rgba(0, 15, 49, 1);
  padding: 14px 15px 0;
  table {
    width: 100%;
    height: 100%;
    thead {
      background: rgba(54, 20, 122, 0.33);
      tr > th {
        // text-align: center;
        padding: 13px 0;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(175, 199, 242, 1);
        line-height: 16px;
      }
    }
    tr > td {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
      span {
        display: block;
        width: 22px;
        height: 22px;
        background: rgba(20, 59, 122, 1);
        line-height: 22px;
        border-left: 4px solid rgba(8, 161, 236, 1);
        &.mark_border_one {
          border-left: 4px solid rgba(246, 170, 3, 1);
        }
        &.mark_border_two {
          border-left: 4px solid rgba(249, 89, 97, 1);
        }
        &.mark_border_three {
          border-left: 4px solid rgba(151, 227, 106, 1);
        }
      }
    }
  }
}
</style>

