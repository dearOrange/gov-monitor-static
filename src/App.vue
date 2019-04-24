<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 公共样式 */
html,
body,
div,
ul,
ol,
li,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
a,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Hiragino Sans GB', 'Microsoft Yahei UI', 'Microsoft Yahei',
    微软雅黑, 'Segoe UI', Tahoma, 宋体b8b体, SimSun, sans-serif;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
}
body,
html {
  height: 100%;
}
ul,
ol,
li {
  list-style: none;
}
a,
u {
  text-decoration: none;
}
a {
  color: #fff;
}
a:hover {
  text-decoration: none;
  color: #fff;
}
input,
textarea,
button {
  margin: 0;
  padding: 0;
  outline: none;
  resize: none;
  border: 0;
  font-family: 'Hiragino Sans GB', 'Microsoft Yahei UI', 'Microsoft Yahei',
    '微软雅黑', 'Segoe UI', Tahoma, '宋体b8b\4f53', SimSun, sans-serif;
}
img {
  border: 0;
  display: block;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 16px;
  font-weight: 100;
}
b,
strong {
  font-weight: 100;
}
em,
i {
  font-style: normal;
}
div,
ul,
ol,
li,
dl,
dd,
dt,
p,
a {
  font-size: 16px;
}
.icon {
  display: inline-block;
}
.icon-loginout {
  width: 32px;
  height: 32px;
  background: url(assets/img/loginout.png) no-repeat center center;
  background-size: cover;
}
.icon-setting {
  width: 32px;
  height: 32px;
  background: url(assets/img/shezhi.png) no-repeat center center;
  background-size: cover;
}
.icon-company {
  width: 23px;
  height: 27px;
  background: url(assets/img/company.png) no-repeat center center;
  background-size: cover;
}
.icon-store {
  width: 31px;
  height: 28px;
  background: url(assets/img/store.png) no-repeat center center;
  background-size: cover;
}
.icon-car {
  width: 30px;
  height: 22px;
  background: url(assets/img/car.png) no-repeat center center;
  background-size: cover;
}
.icon-trend {
  width: 28px;
  height: 28px;
  background: url(assets/img/trend.png) no-repeat center center;
  background-size: cover;
}
.icon-trend2 {
  width: 28px;
  height: 28px;
  background: url(assets/img/trend2.png) no-repeat center center;
  background-size: cover;
}
.icon-gold {
  width: 38px;
  height: 34px;
  background: url(assets/img/gold.png) no-repeat center center;
  background-size: cover;
}
.icon-temperature {
  width: 38px;
  height: 34px;
  background: url(assets/img/temperature.png) no-repeat center center;
  background-size: cover;
}
.icon-goodsnum {
  width: 28px;
  height: 28px;
  background: url(assets/img/goodsnum.png) no-repeat center center;
  background-size: cover;
}
.icon-back {
  width: 26px;
  height: 26px;
  background: url(assets/img/goback.png) no-repeat center center;
  background-size: cover;
}
.icon-train {
  width: 54px;
  height: 36px;
  background: url(assets/img/5.png) no-repeat center center;
  background-size: cover;
  position: absolute;
  left: 40%;
  top: 50%;
  margin: -18px 0 0 -20px;
  /* left: 0;
  margin: 195px 0 0 35.3%;
  bottom: 0;
  right: 0;
  top: 0; */
}
.icon-cloun {
  width: 32px;
  height: 28px;
  background: url(assets/img/4.png) no-repeat center center;
  background-size: cover;
  position: absolute;
  left: 40%;
  top: 50%;
  margin: -4px 0 0 -16px;
  /* left: 0;
  margin: 208px 0 0 36.3%;
  bottom: 0;
  right: 0;
  top: 0; */
}
.clear {
  display: block;
}
.clear:after {
  content: '.';
  clear: both;
  display: block;
  height: 0;
  visibility: hidden;
  font-size: 0;
  line-height: 0;
}

/* 去除百度地图左下角logo和文字 */
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

  width: 100%;
  height: 100%;
  background: rgba(9, 14, 34, 1);
}

.header {
  height: 10vh;
}
.header + div {
  height: 90vh;
}
</style>
