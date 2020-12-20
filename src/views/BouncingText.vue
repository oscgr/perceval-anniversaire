<template>
  <div class="text-wrapper" ref="textRef">
    <h1 class="main-text" v-text="text" />
  </div>
</template>
<script>
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'

export default {
  name: 'bouncing-text',
  props: {
    randomColor: Function
  },
  setup(props) {
    const textRef = ref()

    const text = computed(() => `Bon anniversaire ${state.name} ! 😂`)
    const state = reactive({
      name: '',
      bouncingVideoData: {
        directionX: true,
        directionY: true
      }
    })

    const B_WIDTH = 250,
      SPEED = 0.6

    const step = timestamp => {
      const maxX = window.innerWidth - B_WIDTH,
        maxY = window.innerHeight - B_WIDTH

      const t = timestamp * SPEED
      if (state.bouncingVideoData.directionX !== t % (2 * maxX) > t % maxX) {
        state.bouncingVideoData.directionX = t % (2 * maxX) > t % maxX
        textRef.value.style.color = props.randomColor()
        textRef.value.style.backgroundColor = props.randomColor()
      }
      if (state.bouncingVideoData.directionY !== t % (2 * maxY) > t % maxY) {
        state.bouncingVideoData.directionY = t % (2 * maxY) > t % maxY
        textRef.value.style.color = props.randomColor()
        textRef.value.style.backgroundColor = props.randomColor()
      }

      textRef.value.style.transform = `translate(${
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
      textRef,
      text
    }
  }
}
</script>
<style lang="scss">
.text-wrapper {
  z-index: 11;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 250px;
  height: 250px;
  border: red solid 2px;
  text-align: center;
  .main-text {
    font-family: 'Comic Sans MS', sans-serif;
  }
}
</style>
