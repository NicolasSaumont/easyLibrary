<script lang="ts" setup>
import Navbar from '~/components/Navbar.vue';
</script>

<template>
  <div>
    <Navbar />
    <slot />
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
button {
  border: none;
  font-size: 1rem;
}
a {
  text-decoration: none;
}
</style>
