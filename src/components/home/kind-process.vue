<template>
  <div class="kind-process">
    <label class="label">{{label}}</label>
    <div class="bar">
      <span class="inner-text" :style="{width: percentage + '%'} ">
        <span class="text" :style="{
          left: percentage > 90 ? 'auto':'100%',
          right: percentage > 90 ? '0':'auto',
        }">{{innerText}}吨</span>
      </span>
      <el-progress class="progress_img" :show-text="false" :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'kind-process',
  props: {
    label: String,
    innerText: String | Number,
    percentage: Number | String
  },
  data() {
    return {
      // innerColor: 'red'
    }
  }
}
</script>


<style lang="less" scoped>
.kind-process {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label {
    width: 4em;
    color: #fff;
  }
  .bar {
    flex: 1 auto;
    position: relative;
    .inner-text {
      position: absolute;
      left: 0;
      bottom: 100%;
      height: 100%;
      color: #fff;
      white-space: nowrap;
      .text {
        position: absolute;
        left: 100%;
        top: -3px;
        z-index: 99;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.45);
        font-size: 12px;
      }
    }
  }
}
</style>


<style lang="less">
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
