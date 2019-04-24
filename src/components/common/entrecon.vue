<template>
    <div class="title-con">
        <div class="border-dot"></div>
        <div class="border-dot"></div>
        <div class="border-dot"></div>
        <div class="border-dot"></div>
        <div class="inner-title">
        <EntreTitle/>
        <div class="entreLine"></div>
        <EntreTitle/>
        </div>
    </div>
</template>

<script>
import EntreTitle from './entretitle'
export default {
  name: 'EntreCon',
  components: {
    EntreTitle
  }
}
</script>

<style lang="less" scoped>
.title-con {
  border: 1px solid rgba(20, 59, 122, 1);
  position: relative;
  .border-dot {
    width: 4px;
    height: 4px;
    background: rgba(61, 168, 249, 1);
    border-radius: 50%;
    position: absolute;
    &:nth-child(odd) {
      left: -2px;
    }
    &:nth-child(even) {
      right: -2px;
    }
    &:nth-child(1) {
      top: -2px;
    }
    &:nth-child(2) {
      top: -2px;
    }
    &:nth-child(3) {
      bottom: -2px;
    }
    &:nth-child(4) {
      bottom: -2px;
    }
  }
}
.inner-title {
  display: flex;
  padding: 10px 0;
  background: rgba(20, 59, 122, 1);
  text-align: center;
  margin: 3px;
  .entreLine {
    width: 2px;
    height: 18px;
    background: rgba(12, 17, 42, 1);
  }
}
</style>

