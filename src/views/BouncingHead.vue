<template>
  <div class="bouncing-head-wrapper" ref="bouncingHeadRef">
    <v-img class="bouncing-head" :src="imgURL" />
  </div>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'

export default {
  name: 'bouncing-head',
  props: {
    randomColor: Function
  },
  setup(props) {
    const vm = getCurrentInstance()
    const bouncingHeadRef = ref()
    let rotation = 0

    const state = reactive({
      imgURL: '',
      bouncingHeadData: {
        directionX: true,
        directionY: true
      }
    })

    const B_WIDTH = 170,
      SPEED = 0.4

    const step = timestamp => {
      const maxX = window.innerWidth - B_WIDTH,
        maxY = window.innerHeight - B_WIDTH

      const t = timestamp * SPEED
      if (state.bouncingHeadData.directionX !== t % (2 * maxX) > t % maxX) {
        state.bouncingHeadData.directionX = t % (2 * maxX) > t % maxX
        bouncingHeadRef.value.style.borderColor = props.randomColor()
        // textRef.value.style.color = randomColor()
        document.getElementById(
          'app'
        ).style.backgroundColor = props.randomColor()
        rotation = (rotation + 90) % 360
      }
      if (state.bouncingHeadData.directionY !== t % (2 * maxY) > t % maxY) {
        state.bouncingHeadData.directionY = t % (2 * maxY) > t % maxY
        bouncingHeadRef.value.style.borderColor = props.randomColor()
        // textRef.value.style.color = randomColor()
        document.getElementById(
          'app'
        ).style.backgroundColor = props.randomColor()
        rotation = (rotation + 90) % 360
      }

      bouncingHeadRef.value.style.transform = `translate(${
        state.bouncingHeadData.directionX ? maxX - (t % maxX) : t % maxX
      }px, ${
        state.bouncingHeadData.directionY ? maxY - (t % maxY) : t % maxY
      }px) rotate(${rotation}deg)`
      window.requestAnimationFrame(step)
    }

    onMounted(() => {
      // state.name = vm.$route.query.name
      state.imgURL = vm.$route.query.url
      bouncingHeadRef.value.style.width = `${B_WIDTH}px`
      bouncingHeadRef.value.style.height = `${B_WIDTH}px`
      bouncingHeadRef.value.firstChild.style.maxWidth = '100%'
      bouncingHeadRef.value.firstChild.style.maxHeight = '100%'

      window.requestAnimationFrame(step)
    })
    return {
      ...toRefs(state),
      bouncingHeadRef
    }
  }
}
</script>
<style lang="scss">
.bouncing-head-wrapper {
  border-width: 10px;
  border-style: solid;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
