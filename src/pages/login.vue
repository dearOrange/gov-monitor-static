<template>
  <div id="loginBg">
    <div id="login_content">
      <!-- <div class="login_title">冷链流通监控平台</div> -->
      <el-form
        :model="loginData"
        status-icon
        :rules="loginFieldRules"
        ref="loginForm"
        class="demo-ruleForm loginForm"
      >
        <div class="login_title">
          <div class="logo_img">
            <img src="../assets/logo.png" alt>
          </div>
          <div class="login_name">农产品冷链流通监控平台</div>
        </div>
        <div class="login_input">
          <el-form-item prop="username">
            <el-input
              id="username"
              type="text"
              v-model="loginData.userAccount"
              auto-complete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              id="password"
              type="password"
              v-model="loginData.userPassword"
              auto-complete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </el-form-item>
        </div>
        <div id="weixin_login_container"></div>
      </el-form>
    </div>
  </div>
</template>
<script>
// import axios from '../api/resource.js'
import loginApi from '@/api/login'

import { withValidator, validPassword, validUserName } from '@utils/valid'
let Base64 = require('js-base64').Base64

export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        userAccount: '',
        userPassword: ''
      },
      loginFieldRules: {
        password: [
          { validator: withValidator(validPassword), trigger: 'blur' }
        ],
        username: [{ validator: withValidator(validUserName), trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          let loginParams = { ...this.loginData }
          loginApi.login(loginParams).then(({ success, data: { data } }) => {
            if (success) {
              sessionStorage.setItem('center1', data.longitude)
              sessionStorage.setItem('center2', data.latitude)
              this.$router.push('/home')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
#loginBg {
  width: 100%;
  height: 100%;
  background: url(../assets/img/login_bg.jpg) no-repeat center;
  background-size: cover;
  #login_content {
    width: 820px;
    height: 522px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -60%);
    -webkit-transform: translate(-50%, -60%);
    -moz-transform: translate(-50%, -60%);
    -ms-transform: translate(-50%, -60%);
    -o-transform: translate(-50%, -60%);
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
    .loginForm {
      .login_name {
        color: #fff;
        font-size: 36px;
        //padding: 73px 0 32px;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
      }
      .login_input {
        padding: 36px 55px;
        //display: inline-block;

        .el-input {
          input {
            width: 100%;
            height: 57px;
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
            background: #fff;
            &#username {
              background: #fff url(../assets/login_user.png) no-repeat 10px
                center;
              text-indent: 20px;
            }
            &#password {
              background: #fff url(../assets/login_pass.png) no-repeat 10px
                center;
              text-indent: 20px;
            }
          }
        }
        .el-button {
          width: 100%;
          height: 57px;
          cursor: pointer;
        }
      }
      .login_title {
        padding: 64px 0 32px;

        .logo_img {
          margin-right: 22px;
          display: inline-block;

          img {
            display: inline-block;
            height: 60px;
          }
        }
      }

      #weixin_login_container {
        display: none;
      }
    }
  }
}
</style>

