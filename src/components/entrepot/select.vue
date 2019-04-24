<template>
  <div class="select--container">
    <el-select v-model="value" placeholder="选择仓库" class="select--one">
      <el-option>暂无数据</el-option>
    </el-select>
    <el-select v-model="value" placeholder="摄像头" class="select--two">
      <el-option>暂无数据</el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      options: [],
      value: ''
    }
  }
}
</script>

<style>
.select--container {
  height: 36px;
  margin-bottom: 16px;
}
.select--container .select--one {
  width: 176px !important;
  height: 36px !important;
}
.select--container .select--two {
  width: 92px !important;
  height: 36px !important;
}
.select--container .el-input__inner {
  background: rgba(20, 59, 122, 1) !important;
  border-color: rgba(20, 59, 122, 1) !important;
}
.el-select-dropdown {
  background: rgba(1, 7, 30, 0.78) !important;
  border: 0;
}
.el-popper[x-placement^='bottom'] .popper__arrow {
  border-bottom-color: rgba(1, 7, 30, 0.78) !important;
}
.el-popper[x-placement^='bottom'] .popper__arrow::after {
  border-bottom-color: rgba(1, 7, 30, 0.78) !important;
}
.select--container .el-select-dropdown {
  background: rgba(1, 7, 30, 0.78) !important;
}
.select--container .el-select-dropdown__item {
  color: #fff !important;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: rgba(1, 7, 30, 0.78) !important;
  color: rgba(1, 98, 255, 1) !important;
}
</style>
