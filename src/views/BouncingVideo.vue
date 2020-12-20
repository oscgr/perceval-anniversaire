<template>
  <div class="video-wrapper" ref="videoRef">
    <iframe
      title="video"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/VzpIjs0xfbs?autoplay=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
import { onMounted, reactive, ref, toRefs } from '@vue/composition-api'

export default {
  name: 'bouncing-video',
  props: {
    randomColor: Function
  },
  setup() {
    // const vm = getCurrentInstance()
    const videoRef = ref()

    const state = reactive({
      bouncingVideoData: {
        directionX: true,
        directionY: true
      }
    })

    const B_WIDTH = 560,
      B_HEIGHT = 315,
      SPEED = 0.2

    const step = timestamp => {
      const maxX = window.innerWidth - B_WIDTH,
        maxY = window.innerHeight - B_HEIGHT

      const t = timestamp * SPEED
      if (state.bouncingVideoData.directionX !== t % (2 * maxX) > t % maxX) {
        state.bouncingVideoData.directionX = t % (2 * maxX) > t % maxX
        // textRef.value.style.color = randomColor()
      }
      if (state.bouncingVideoData.directionY !== t % (2 * maxY) > t % maxY) {
        state.bouncingVideoData.directionY = t % (2 * maxY) > t % maxY
        // textRef.value.style.color = randomColor()
      }

      videoRef.value.style.transform = `translate(${
        state.bouncingVideoData.directionX ? maxX - (t % maxX) : t % maxX
      }px, ${
        state.bouncingVideoData.directionY ? maxY - (t % maxY) : t % maxY
      }px)`
      window.requestAnimationFrame(step)
    }

    onMounted(() => {
      window.requestAnimationFrame(step)
    })
    return {
      ...toRefs(state),
      videoRef
    }
  }
}
</script>
<style lang="scss">
.video-wrapper {
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
