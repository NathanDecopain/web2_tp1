<script>

import Sidebar from "../components/chat/Sidebar.vue";
import ChatComponent from "../components/chat/ChatComponent.vue";
import {useUserStore} from "../stores/userStore.js";

export default {
  components: {Sidebar, ChatComponent},
  setup() {
    return {
      userStore: useUserStore(),
    }
  },
  async beforeCreate() {
    if (!this.userStore.user.uid) {
      this.$router.push("/login")
    }
  }
}
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
