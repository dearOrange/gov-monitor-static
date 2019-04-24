<template>
  <div class="plaque">
    <i class="dot"></i>
    <i class="dot"></i>
    <i class="dot"></i>
    <i class="dot"></i>
    <div class="inner">
      <ul class="plaque-list">

        <template v-for="(item, index) in data">
          <li class="item" :key="item.label">
            <label class="label">{{item.label}}</label>
            <span class="num">
              <num :from="0" :to="item.value" :period="1000"></num></span>
          </li>
          <li v-if="data.length !== (index + 1)" class="line" :key="item.label + '_line'"></li>
        </template>
        <!-- <li class="line"></li>
        <li class="item">
          <label class="label">企业总数</label>
          <span class="num">255</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import Num from '@components/common/num'
export default {
  name: 'plaque',
  components: {
    Num
  },
  props: {
    data: Array,
    required: true
  }
}
</script>

<style lang="less" scoped>
.plaque {
  position: relative;
  border: 1px solid #143b7a;
  padding: 3px;
  .dot {
    width: 4px;
    height: 4px;
    background: #3da8f9;
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
  .inner {
    height: 40px;
    background: #143b7a;
  }
}

.plaque-list {
  display: flex;
  align-items: center;
  height: 100%;
  li.item {
    flex: 1 auto;
    text-align: center;
    font-size: 14px;
    .label {
      color: #fff;
      font-family: MicrosoftYaHei;
      font-weight: 400;
    }
    .num {
      margin-left: 10px;
      color: #dc8640;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
    }
  }

  li.line {
    width: 2px;
    height: 50%;
    background: #0c112a;
  }
}
</style>


