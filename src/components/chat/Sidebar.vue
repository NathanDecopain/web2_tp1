<script setup>

import ChatComponent from "./ChatComponent.vue";
import UserNavbar from "./UserNavbar.vue";
import UserSearchComponent from "./UserSearchComponent.vue";
import ChatSelectorComponent from "./ChatSelectorComponent.vue";
</script>

<template>
  <div id="sidebar">
    <UserNavbar/>
    <UserSearchComponent />
    <ChatSelectorComponent/>
  </div>
</template>

<style scoped>
#sidebar {
  background-color: #2b2d31;
  flex: 1;
  height: 100%;
  width: 100%
}
</style>
