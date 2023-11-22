<script lang="ts" setup>
defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button>{{ buttonText }}</button>
</template>

<style>
button {
  cursor: pointer;
  margin: 0 1em;
  padding: 1em;
  background-color: #5f69c2;
  color: #f8f8f8;
  font-weight: 700;
  border-radius: 0.5em;
  transition: all 0.2s ease-in-out;
}
button:hover {
  background-color: #7b86ed;
}
</style>
