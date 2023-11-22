<script lang="ts" setup></script>

<template>
  <div class="navbar">
    <div class="navigation">
      <img
        class="logo"
        src="../../public/logo_easyLibrary.png"
        alt="easyLibrary"
      />
      <ul class="navigation-items">
        <li class="navigation-item">Tableau de bord</li>
        <li class="navigation-item">Mes livres</li>
        <li class="navigation-item">Calendrier</li>
      </ul>
    </div>
    <div class="action">
      <Button>+ Ajouter un livre</Button>
      <Button>Mon profil</Button>
    </div>
  </div>
</template>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  background-color: #1f2937;
}
.logo {
  width: 50px;
}
.navigation {
  display: flex;
}
.navigation-items {
  display: flex;
  margin: 0 2em;
  align-items: center;
}
.navigation-item {
  margin: 1em;
}
.action {
  display: flex;
  align-items: center;
}
</style>
