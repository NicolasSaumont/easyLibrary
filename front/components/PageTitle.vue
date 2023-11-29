<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h1>{{ text }}</h1>
</template>

<style>
h1 {
  margin: 1em 2em;
  color: #1f2937;
}
</style>
