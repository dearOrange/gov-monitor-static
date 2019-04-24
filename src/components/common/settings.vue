<template>
  <div class="settings">
    <h2>系统标题设置</h2>
    <div class="setting-box">
      <label for>主标题显示</label>
      <input type="text" v-model="value.val2" placeholder="标题20字以内">
    </div>
    <div class="span--mark">标题20字以内</div>
    <div class="setting-box">
      <label for>副标题显示</label>
      <input type="text" v-model="value.val1" placeholder="10个字以内">
    </div>
    <div class="span--mark">10个字以内</div>
    <div class="settings-btns">
      <div class="settings-btn" @click="cancelSet">取消</div>
      <div class="settings-btn" @click="sureSet">确认</div>
    </div>
  </div>
</template>
<script>
import { fetchAllData } from '@/api/title'
export default {
  name: 'Settings',
  props: {
    value: Object
  },
  methods: {
    cancelSet() {
      this.$emit('close')
    },
    async sureSet() {
      let { success, data } = await fetchAllData(
        this.value.val1,
        this.value.val2
      )
      if (success) {
        this.$emit('close')
        this.$router.go(0)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.settings {
  padding: 71px 162px 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 34px;
    font-family: MicrosoftYaHei;
    color: rgba(9, 15, 59, 1);
    margin-bottom: 69px;
  }

  .setting-box {
    width: 100%;
    height: 50px;
    label {
      font-size: 20px;
      font-family: MicrosoftYaHei;
      color: rgba(9, 15, 59, 1);
    }
    input {
      width: 380px;
      height: 50px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      margin-left: 16px;
      text-indent: 2em;
    }
  }
  .span--mark {
    font-size: 12px;
    color: rgba(125, 125, 125, 1);
    margin-bottom: 30px;
    align-self: flex-start;
    margin-left: 120px;
    margin-top: 4px;
  }
  .settings-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    & > .settings-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 192px;
      height: 60px;
      border: 1px solid rgba(38, 155, 246, 1);
      border-radius: 4px;
      font-size: 20px;
      cursor: pointer;
      &:first-child {
        color: rgba(38, 155, 246, 1);
      }
      &:last-child {
        background: rgba(38, 155, 246, 1);
        color: #fff;
      }
    }
  }
}
</style>
