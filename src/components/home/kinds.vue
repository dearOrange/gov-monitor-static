<template>
  <div class="kinds">
    <h2>
      <i class="icon icon-goodsnum"></i>
      <span>30天大类产品出货量</span>
    </h2>
    <ul class="lines_progress" ref="con1" :class="{anim:animate==true}">
      <li v-for="(item, index) in this.data.biCategoryDatas" :key="index">
        <kind-process
          :label="item.categoryName"
          :innerText="item.total"
          :percentage="item.percentage"
        ></kind-process>
        <!-- <div class="item">
          <label>{{item.categoryName}}</label>
          <span>{{item.total}}吨</span>
          <el-progress class="progress_img" :show-text="true" :text-inside="true" :stroke-width="18" :percentage="item.percentage"></el-progress>
        </div>-->
      </li>
    </ul>
  </div>
</template>

<script>
import KindProcess from './kind-process'

export default {
  name: 'kinds',
  components: {
    KindProcess
  },
  props: {
    data: Object
  },

  data() {
    return {
      myEcharts: null,
      animate: false
    }
  },

  watch: {
    data(newVal, oldVal) {
      if (newVal !== oldVal) {
        // this.render()
      }
    }
  },
  created() {
    setInterval(this.scroll, 3000)
  },
  methods: {
    render() {},
    scroll() {
      this.animate = true
      setTimeout(() => {
        this.data.biCategoryDatas.push(this.data.biCategoryDatas[0])
        this.data.biCategoryDatas.shift()
        this.animate = false
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.kinds {
  // width: 100%;
  // height: 45%;
  flex: 1;
  background: rgba(94, 109, 240, 0.1);
  border-radius: 4px;
  // margin: 0 0 3% 3%;
  padding: 20px 30px 10px;
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
    // margin: 26px 0 24px 0;
    margin-top: 14px;
    > li {
      flex: 1 auto;
      // height: 60px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }
  }
}
.anim {
  transition: all 0.5s;
  // margin-top: -30px;
}
</style>

