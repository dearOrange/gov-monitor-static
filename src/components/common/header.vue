<template>
  <div class="header">
    <div class="leftLogo">
      <router-link to="/home">
        <div class="logo_img">
          <img src="../../assets/logo.png" alt>
        </div>
      </router-link>
      <span>{{fullName}}</span>
    </div>
    <div class="middleContent">{{monitorTitle}}</div>
    <div class="rightLoginout">
      <ul>
        <Time/>
        <li @click="settings(fullName, monitorTitle)">
          <i class="icon icon-setting"></i>
        </li>
        <li v-if="isShow" @click="loginOut">
          <i class="icon icon-loginout"></i>
        </li>
        <router-link v-else to="/home" tag="li">
          <i class="icon icon-back"></i>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Time from './time.vue'
import homeApi from '@/api/home'
import loginApi from '@/api/login'

export default {
  name: 'Header',
  props: {
    isShow: {
      type: Boolean
    }
  },
  data() {
    return {
      monitorTitle: '农产品冷链流通监控平台', //首页展示title
      fullName: '1号冷链' //业务单位名称
    }
  },
  components: {
    Time
  },
  mounted() {
    homeApi.fetchAllData().then(({ success, data: { data } }) => {
      if (success) {
        this.monitorTitle = data.monitorTitle
        this.fullName = data.fullName
      }
    })
  },
  methods: {
    loginOut() {
      this.$confirm('确定退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action === 'confirm') {
            loginApi.logout().then(({ success }) => {
              if (success) {
                sessionStorage.removeItem('center1')
                sessionStorage.removeItem('center2')
                this.$router.push('/')
              }
            })
          }
        }
      })
    },
    settings(val1, val2) {
      this.$emit('fetchSetting', { val1, val2 })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  width: 100%;
  // height: 10%;
  display: -webkit-flex;
  .leftLogo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 18%;
    padding: 0 0 0 31px;
    .logo_img {
      // float: left;
      width: 84px;
      // height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      // float: left;
      font-size: 14px;
      line-height: 14px;
      color: #fff;
      font-family: MicrosoftYaHei;
      // margin-left: 10px;
      // margin-top: 12px;
      // margin-right: 10px;
    }
  }
  .middleContent {
    flex: 1;
    height: 82%;
    font-size: 30px;
    line-height: 78px;
    color: #fff;
    text-align: center;
    // margin-top: 25px;
    background: url(../../assets/img/title.png) no-repeat center center;
    background-size: cover;
  }
  .rightLoginout {
    width: 18%;
    color: #fff;
    margin-top: 37px;
    ul {
      li {
        float: left;
        font-size: 14px;
        color: #fff;
        margin-left: 16px;
        //font-family: DIN-Medium;
        font-weight: 500;
        line-height: 14px;
        &:first-of-type {
          margin-left: 0;
        }
        &:nth-of-type(2) {
          margin-top: -10px;
        }
        &:last-of-type {
          margin-top: -10px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1640px) {
  .header {
    .leftLogo {
      padding: 0 0 0 4px;
    }
    .middleContent {
      font-size: 28px;
    }
  }
}
</style>

