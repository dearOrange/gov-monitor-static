<template>
    <div class="ranking">
        <h3>近30日销往地区TOP10</h3>
        <Ranking/>
    </div>
</template>

<script>
import Ranking from '../common/ranking'
export default {
  components: {
    Ranking
  }
}
</script>

<style lang="less" scoped>
.ranking {
  flex: 1;
  h3 {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    margin-left: 66px;
  }
}
</style>
