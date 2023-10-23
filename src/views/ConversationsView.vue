<script setup>

import Sidebar from "../components/chat/Sidebar.vue";
import ChatComponent from "../components/chat/ChatComponent.vue";
</script>

<template>
  <div id="top" class="columns is-gapless">
    <div class="column is-one-third">
      <Sidebar></Sidebar>
    </div>
    <div class="column is-two-thirds">
      <ChatComponent></ChatComponent>
    </div>
  </div>
</template>

<style scoped>
#top {
  height: 100vh;
  overflow-y: auto;
}
</style>
