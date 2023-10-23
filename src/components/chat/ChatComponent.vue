<script>
import MessagesFeedComponent from "./MessagesFeedComponent.vue";
import InputComponent from "./InputComponent.vue";

import {doc, getDoc} from "firebase/firestore";
import {firebaseApp} from "../../firebaseSetup/firebaseConfig.js";
import {useUserStore} from "../../stores/userStore.js";
export default {
  components: {MessagesFeedComponent, InputComponent},
  setup() {
    return {
      userStore: useUserStore(),
      chatStore: useUserStore()
    }
  },
  data() {
    return {
      groupName: "",

    }
  },
  methods: {
    async fetchGroupInfo() {
      let groupData = await getDoc(doc(firebaseApp.db, "user_groups", this.userStore.user.uid))
      groupData = await groupData.data()
      groupData = Array(await groupData).filter((group) => group.id === this.chatStore.chatMessagesId)
      groupData = groupData[0]
      console.log(groupData)
      this.groupName = groupData.name;
    }
  },
  created() {
    this.fetchGroupInfo()
    this.chatStore.$subscribe((newValue) => {
      this.fetchGroupInfo()
    })
  }
}

</script>

<template>
  <div class="chat">
    <div class="chatInfo">
      <span style="font-weight: bold">{{ this.groupName }}</span>
      <div class="chatIcons">
        <i class="fa-solid fa-camera"></i>
        <i class="fa-solid fa-user-plus"></i>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
    </div>
    <MessagesFeedComponent/>
    <InputComponent/>
  </div>
</template>

<style scoped>
@import "/src/styles/components/chat.css";

</style>
