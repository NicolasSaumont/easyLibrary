<script lang="ts" setup>
import Button from './Button.vue';

const connected = true;

const addBookButtonLabel = '+ Ajouter un livre';
const profileButtonLabel = 'Mon profil';

defineProps({
  addButtonLabel: String,
});
</script>

<template>
  <div class="navbar">
    <div class="navigation">
      <a href="/">
        <img class="logo" src="/logo_easyLibrary.png" alt="easyLibrary" />
      </a>
      <ul class="navigation-items">
        <a href="/" class="active"
          ><li class="navigation-item">Tableau de bord</li></a
        >
        <a href="/livres"><li class="navigation-item">Mes livres</li></a>
        <a href="/calendrier"><li class="navigation-item">Calendrier</li></a>
      </ul>
    </div>
    <div class="action">
      <Button :buttonText="addBookButtonLabel" />
      <a href="/profil">
        <Button v-if="connected" :button-text="profileButtonLabel" />
      </a>
    </div>
  </div>
</template>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  background-color: #1f2937;
  color: #f8f8f8;
}
.navigation {
  display: flex;
  align-items: center;
}
.logo {
  width: 50px;
  height: 50px;
}
.navigation-items {
  display: flex;
  align-items: center;
  margin: 0 2em;
}
.navigation-items a {
  color: #f8f8f8;
  padding: 1em;
  margin: 0 0.5em;
  border-radius: 0.5em;
  transition: all 0.2s ease-in-out;
}
.navigation-items a:hover {
  cursor: pointer;
  background-color: #111827;
}
.navigation-items a.active {
  background-color: #111827;
}
.action {
  display: flex;
  align-items: center;
}
</style>
