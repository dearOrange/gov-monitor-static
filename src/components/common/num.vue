<template>
  <span>{{num}}</span>
</template>

<script>
import Between from 'between.js'

export default {
  name: 'num',
  props: {
    to: {
      type: Number,
      required: true,
      default: 0
    },
    from: {
      type: Number
    },
    period: {
      type: Number,
      default() {
        return 500
      }
    },
    fix: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      num: this.to
    }
  },
  watch: {
    to(newVal, oldVal) {
      // console.log('%s, %s', newVal, oldVal)
      if (newVal !== oldVal) {
        this.anim(oldVal, newVal)
      }
    }
  },

  methods: {
    anim(from, to) {
      let btw = new Between(from, to).time(this.period).on('update', value => {
        if (this.fix) {
          this.num = value.toFixed(2)
        } else {
          this.num = value.toFixed(0)
        }
      })
    }
  },

  mounted() {
    // console.log(this.from)
    if (this.from != null) {
      this.anim(this.from, this.to)
    }
  }
}
</script>

