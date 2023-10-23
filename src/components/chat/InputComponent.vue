<script>
import {useUserStore} from "../../stores/userStore.js";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc, where
} from "firebase/firestore";
import {firebaseApp} from "../../firebaseSetup/firebaseConfig.js";

export default {
  setup() {
    return {
      userStore: useUserStore(),
      chatStore: useUserStore()
    }
  },
  data() {
    return {
      text: ""
    }
  },
  methods: {
    async handleSend() {
      if (this.text.trim().length === 0) return
      const sentMessageRef = await updateDoc(doc(firebaseApp.db, "group_messages", this.chatStore.chatMessagesId), {
        messages: arrayUnion({
          text: this.text,
          sent_by: this.userStore.user.uid,
          sent_at: Timestamp.now()
        })
      })
      await this.updateLastChecked()

      // Update sent messages in user_groups for each member
      /* DB structure = {
        user_groups: {
          user_uid: {
            group_id: {
              id: group_id,
              last_checked: Timestamp,
              recent_message: {
                text: String,
                read_by: {
                  sent_by: String,
                  sent_at: Timestamp
                }
              }
            }
          }
        }
      } */
      // Get all members of the group
      const groupMembers = Object.keys((await getDoc(doc(firebaseApp.db, "groups", this.chatStore.chatMessagesId))).data().members)
      // Update each member's user_groups
      groupMembers.forEach((member) => {
        setDoc(doc(firebaseApp.db, "user_groups", member), {
          [this.chatStore.chatMessagesId]: {
            id: this.chatStore.chatMessagesId,
            recent_message: {
              text: this.text,
              read_by: {
                sent_by: this.userStore.user.uid,
                sent_at: Timestamp.now()
              }
            }
          }
        }, { merge: true })
      })
      this.text = ""
    },
    async updateLastChecked() {
      const groupRef = doc(firebaseApp.db, "user_groups", this.userStore.user.uid)
      await setDoc(groupRef, {
        [this.chatStore.chatMessagesId]: {
          id: this.chatStore.chatMessagesId,
          last_checked: Timestamp.now()
        }
      }, { merge: true })
      console.log((await getDoc(groupRef)).data())
    }
  }
}
</script>

<template>
<div class="chatInput">
  <input v-model="this.text" type="text" placeholder="Tapez un message..." @keyup.enter="handleSend">
  <div class="send">
    <!--HANDLE LATER <input type="file" style="display: none" id="file">-->
    <!--<input type="image" style="display: none" id="image" alt="">-->
    <label for="file">
      <i class="fa-solid fa-paperclip"></i>
    </label>
    <label for="image">
      <i class="fa-solid fa-image"></i>
    </label>
    <button class="button is-primary is-small" @click="handleSend">
      Send
    </button>
  </div>
</div>
</template>

<style scoped>
@import "/src/styles/components/chat.css";
.chatInput {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
}

::placeholder {
  color: lightgray;
}

.chatInput input {
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;

}
.send {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
