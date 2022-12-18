<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style>
body {
  background-image: url("assets/image/background.jpg");
  background-size: cover;
}
</style>
