<template>
    <li id="clock">
      {{time}}
    </li>
</template>
<script>
export default {
  name: 'clock',
  data() {
    return {
      time: ''
    }
  },
  methods: {
    swing() {
      var date = new Date()
      var year = date.getFullYear()
      var mouths = date.getMonth() + 1
      var day = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      var weekDay = new Array(7)
      weekDay[0] = '星期日'
      weekDay[1] = '星期一'
      weekDay[2] = '星期二'
      weekDay[3] = '星期三'
      weekDay[4] = '星期四'
      weekDay[5] = '星期五'
      weekDay[6] = '星期六'
      if (mouths >= 0 && mouths <= 9) {
        mouths = '0' + mouths
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      this.time = `${year}-${mouths}-${day} ${hours}:${minutes}:${seconds}  ${
        weekDay[date.getDay()]
      }`

      setTimeout(() => {
        this.swing()
      }, 1000)
    }
  },
  mounted() {
    this.swing()
  }
}
</script>
