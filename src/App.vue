<script setup>

import NavbarComponent from "./components/NavbarComponent.vue";
</script>

<template>
  <div id="app">
    <navbar-component v-if="!$route.meta.noNav"></navbar-component>
    <router-view></router-view>
  </div>
</template>

<style>
  @import "./styles/bulma.css";
  @import "./assets/fontawesome/css/all.css";
</style>
