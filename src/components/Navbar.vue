<script lang="ts" setup></script>

<template>
  <div class="navbar">
    <div class="navigation">
      <a href="/">
        <img
          class="logo"
          src="../../public/logo_easyLibrary.png"
          alt="easyLibrary"
        />
      </a>
      <ul class="navigation-items">
        <li class="navigation-item active">Tableau de bord</li>
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
  margin: 0 1em;
  align-items: center;
}
.navigation-item {
  padding: 1em;
  margin: 1em;
  border-radius: 0.5em;
}
.navigation-item:hover {
  cursor: pointer;
  background-color: #111827;
}
.navigation-item.active {
  background-color: #111827;
}
.action {
  display: flex;
  align-items: center;
}
</style>
