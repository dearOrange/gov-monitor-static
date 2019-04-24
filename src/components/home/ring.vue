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
        return 180
      }
    },
    process: {
      type: Number,
      default: 0
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

  watch: {
    process: {
      handler: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.ringRender.smoothUpdata(newVal)
        }
      }
    }
    // process(newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     this.render()
    //   }
    // }
  },

  methods: {
    test() {
      this.ringRender.smoothUpdata(Math.floor(Math.random() * 100))
    },

    render() {
      let ringRender = (this.ringRender = RingRender.factory(
        this.$refs.ring,
        this.beginColor,
        this.endColor
      ))
      ringRender.instantUpdata(this.process)
    }
  },
  mounted() {
    this.render()
  }
}
</script>

<style lang="less" scoped>
.ring {
  position: relative;
  flex: 1;
}
</style>


