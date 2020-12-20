<template>
  <div>
    <bouncing-text :random-color="randomColor" />
    <bouncing-head :random-color="randomColor" />
    <bouncing-video :random-color="randomColor" />
    <div class="pyro">
      <div class="before"></div>
      <div class="after"></div>
    </div>
  </div>
</template>
<script>
import BouncingHead from '@/views/BouncingHead'
import BouncingVideo from '@/views/BouncingVideo'
import BouncingText from '@/views/BouncingText'

export default {
  name: 'GeneratedAnimation',
  components: { BouncingText, BouncingVideo, BouncingHead },
  setup() {
    const randomColor = () =>
      '#' +
      Math.random()
        .toString(16)
        .substr(2, 6)

    return {
      randomColor
    }
  }
}
</script>
