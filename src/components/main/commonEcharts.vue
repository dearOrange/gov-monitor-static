<template>
  <div :id="id" :class="className"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    props: ['options','id','className'],
    data: function () {
      return {

      }
    },
    mounted: function(){
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.options);
    }
  }
</script>

<style lang="less" scoped>

</style>