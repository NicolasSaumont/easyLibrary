<script lang="ts" setup>
import Navbar from './src/components/Navbar.vue';
import Home from './src/pages/Home.vue';
</script>

<template>
  <div>
    <Navbar />
    <Home />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #f3f4f6;
}
ul {
  list-style: none;
}
</style>
