<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import 'jquery/dist/jquery.js'
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/js/bootstrap.bundle.js"
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  setup() {
  }
}
</script>

<style>
body {
  background-image: url("assets/image/background.jpg");
  background-size: cover;
}
</style>
