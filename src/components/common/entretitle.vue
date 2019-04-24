<template>
    <div class="entre_title">
        <span>{{title}}</span>
        <span>255</span>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.entre_title {
  flex: 1;
  span {
    font-size: 14px;
    line-height: 14px;
    display: inline-block;
    &:first-child {
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    &:last-child {
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(220, 134, 64, 1);
      margin-left: 10px;
    }
  }
}
</style>

