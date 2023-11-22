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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #f3f4f6;
  font-family: 'Montserrat', sans-serif;
}
ul {
  list-style: none;
}
</style>
