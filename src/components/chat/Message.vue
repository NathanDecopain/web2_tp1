<script>
import {useUserStore} from "../../stores/userStore.js";

export default {
  setup() {
    return {
      userStore: useUserStore()
    }
  },
  data() {
    return {
      hovering: false
    }
  },
  props: {
    senderId: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    photoUrl: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}

</script>

<template>
<div @mouseover="this.hovering = true" @mouseleave="this.hovering = false" :class="['chatMessage', { 'owner': senderId === this.userStore.user.uid }]">
  <div class="messageInfo">
    <img :src="this.photoUrl">
    <span class="otherDisplayName">{{ sender }}</span>
    <span :class="['messageTimestamp']">{{ timestamp.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) }}</span>
  </div>
  <div class="messageContent">
    <p>{{ text }}</p>
    <!--<img src="/placeholders/pfp_color.jpg">-->
  </div>
</div>
</template>

<style scoped>
.chatMessage {
  padding-bottom: 10px;
  background-color: transparent;
  display: flex;
  gap: 10px;
}

.chatMessage .messageInfo {
  display: flex;
  flex-direction: column;
  color: whitesmoke;
}
.chatMessage .messageInfo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.chatMessage .messageContent img {
  width: 50%;
  border-radius: 10px;
  padding-bottom: 10px;
}

.chatMessage .messageContent {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 80%;
}

/*.messageTimestamp {
  font-size: 10px;
}*/

.chatMessage .messageContent p {
  max-width: max-content;
  background-color: white;
  padding: 10px 20px;
  border-radius: 0px 10px 10px 10px;
  word-break: break-all;
}

.chatMessage.owner {
  flex-direction: row-reverse;
}
.chatMessage.owner .messageContent {
  align-items: flex-end;
}

.chatMessage.owner .messageContent p {
  background-color: lightcoral;
  color: white;
  border-radius: 10px 0 10px 10px;
}
.chatMessage .messageTimestamp {
  font-size: 10px;
}

.is-hidden {
  display: none;
}
</style>
