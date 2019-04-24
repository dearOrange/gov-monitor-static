<template>
    <div class="polo-container">
      <div class="polo-graph" v-for="(item, index) in tracePercent" :key="index">
          <WaterPolo v-if="isTrue" :data="item.tracePercent" :name="item.categoryName" :color="item.color" :firstId="firstId(index)" :index="index"></WaterPolo>
      </div>
    </div>
</template>

<script>
import truckApi from '@/api/login'
import WaterPolo from '@components/common/waterpolo'
export default {
  data() {
    return {
      tracePercent: [],
      isTrue: false
    }
  },
  components: {
    WaterPolo
  },
  mounted() {
    truckApi.getBiCate().then(({ success, data: { data } }) => {
      if (success) {
        this.tracePercent = data
          .map((ele, index) => {
            return {
              tracePercent: ele.tracePercent.toFixed(2),
              index: index,
              categoryName: ele.categoryName,
              color: ele.colour
            }
          })
          .slice(0, 10)
        this.isTrue = true
      }
    })
  },
  methods: {
    firstId(index) {
      return 'firstId_' + index
    }
  }
}
</script>

<style lang="less" scoped>
.polo-container {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.polo-graph {
  width: 150px;
  height: 174px;
}
</style>

