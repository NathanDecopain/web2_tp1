<script setup>

import NavbarComponent from "./components/NavbarComponent.vue";
</script>

<template>
  <navbar-component v-if="!$route.meta.noNav"></navbar-component>
  <router-view></router-view>
</template>

<style>
  @import "./styles/bulma.css";
  @import "./assets/fontawesome/css/all.css";
</style>
