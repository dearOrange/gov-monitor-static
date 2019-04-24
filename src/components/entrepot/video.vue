<template>
  <div class="video--content">
    <video :src="video" controls="controls" autoplay></video>
  </div>
</template>

<script>
export default {
  name: 'Video',
  props: {
    video: String
  }
}
</script>

<style lang="less" scoped>
.video--content {
  flex: 1;
  video {
    width: 100%;
    height: 328px;
  }
}
</style>
