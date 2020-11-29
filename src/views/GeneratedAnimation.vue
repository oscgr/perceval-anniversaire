<template>
  <div>
    <h1 class="main-text" v-text="text" />
    <div class="bouncing-head-wrapper" ref="bouncingHead">
      <v-img class="bouncing-head" :src="imgURL" />
    </div>
    <video autoplay>
      <source src="src/assets/perceval.mp4" type="video/mp4" />
    </video>
  </div>
</template>
<style lang="scss">
.bouncing-head-wrapper {
  border-width: 10px;
  border-style: solid;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  .bouncing-head {
    position: relative;
    z-index: 10;
    width: 150px;
    height: 150px;
  }
}

.main-text {
  font-family: 'Comic Sans MS', serif;
  color: red;
}
</style>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'

export default {
  name: 'GeneratedAnimation',
  setup() {
    const vm = getCurrentInstance()
    const bouncingHead = ref()

    const B_WIDTH = 170,
      SPEED = 0.25
    let rotation = 0

    const text = computed(() => `Bon anniversaire ${state.name} ! 😂`)
    const state = reactive({
      name: '',
      imgURL: '',
      bouncingHeadData: {
        directionX: true,
        directionY: true
      }
    })

    const randomColor = () =>
      '#' +
      Math.random()
        .toString(16)
        .substr(2, 6)

    const step = timestamp => {
      const maxX = window.innerWidth - B_WIDTH,
        maxY = window.innerHeight - B_WIDTH

      const t = timestamp * SPEED
      if (state.bouncingHeadData.directionX !== t % (2 * maxX) > t % maxX) {
        state.bouncingHeadData.directionX = t % (2 * maxX) > t % maxX
        bouncingHead.value.style.borderColor = randomColor()
        rotation = (rotation + 90) % 360
      }
      if (state.bouncingHeadData.directionY !== t % (2 * maxY) > t % maxY) {
        state.bouncingHeadData.directionY = t % (2 * maxY) > t % maxY
        bouncingHead.value.style.borderColor = randomColor()
        rotation = (rotation + 90) % 360
      }

      bouncingHead.value.style.transform = `translate(${
        state.bouncingHeadData.directionX ? maxX - (t % maxX) : t % maxX
      }px, ${
        state.bouncingHeadData.directionY ? maxY - (t % maxY) : t % maxY
      }px) rotate(${rotation}deg)`
      window.requestAnimationFrame(step)
    }

    onMounted(() => {
      state.name = vm.$route.query.name
      state.imgURL = vm.$route.query.url

      window.requestAnimationFrame(step)
    })
    return {
      ...toRefs(state),
      bouncingHead,
      text
    }
  }
}
</script>
