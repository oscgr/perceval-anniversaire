<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>
<style>
.v-main__wrap {
  background-color: black;
}
body {
  cursor: url('./assets/curseur.png'), auto;
}
</style>
<script>
export default {
  name: 'App'
}
</script>
