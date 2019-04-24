<template>
    <div class="bulk-title">
        <span>{{titleName}}</span>
        <span>{{titleNum}}%</span>
    </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String
    },
    titleNum: {
      type: String,
      default: '0'
    }
  }
}
</script>

<style lang="less" scoped>
.bulk-title {
  width: 30%;
  height: 88px;
  line-height: 94px;
  text-align: center;
  span {
    font-size: 30px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 16px;
    &:last-of-type {
      margin-left: 27px;
    }
  }
}
</style>

