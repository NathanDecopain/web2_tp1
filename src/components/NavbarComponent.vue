

<template>
  <nav class="navbar my-transparent has-text-centered">
    <div class="container is-max-desktop has-text-weight-bold">
      <div class="level is-mobile" style="width: 100%">
        <p class="level-item has-text-centered">
        </p>
        <p class="level-item has-text-centered">
          <router-link to="/" class="">Conversations</router-link>
        </p>
        <p class="level-item has-text-centered p-1">
          <img src="/branding/logo.svg" alt="" style="height: 48px;">
        </p>
        <p class="level-item has-text-centered">
          <a class="">About</a>
        </p>
        <p class="level-item has-text-centered">

        </p>
        <p class="level-right">
          <figure class="image is-64x64 is-rounded p-1">
            <img src="/placeholders/pfp.png" alt=""/>
          </figure>
        </p>
      </div>
    </div>
  </nav>
</template>

<script setup>

</script>

<style scoped>
  .navbar-container {
    max-width: 1366px;
    margin: auto;
  }

  .navbar.my-transparent {
    background-color: transparent;
    background-image: none;
  }

  a {
    color: white;
  }
</style>
