<template>
  <div class="ring">
    <canvas @click="test" ref="ring" :width="size" :height="size"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import RingRender from '@utils/ring-render.js'

export default {
  props: {
    size: {
      type: Number | String,
      default() {
        return 160
      }
    },
    process: {
      type: Number
    },
    beginColor: {
      type: String
    },
    endColor: {
      type: String
    }
  },

  data() {
    return {
      ringRender: null
    }
  },

  methods: {
    test() {
      this.ringRender.smoothUpdata(Math.floor(Math.random() * 100))
    }
  },

  mounted() {
    let ringRender = (this.ringRender = RingRender.factory(
      this.$refs.ring,
      this.beginColor,
      this.endColor
    ))
    ringRender.instantUpdata(this.process)
  }
}
</script>

<style lang="less" scoped>
.ring {
  position: relative;
  flex: 1;
}
</style>


