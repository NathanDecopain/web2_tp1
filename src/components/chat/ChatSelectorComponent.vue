<script>
  import {useUserStore} from "../../stores/userStore.js";
  import {arrayUnion, collection, doc, getDoc, onSnapshot, setDoc, Timestamp, updateDoc} from "firebase/firestore"
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
        userGroups: null
      }
    },
    methods: {
      async fetchUserGroups() {
        // Get user groups ids
        const unsubscribe = await onSnapshot(doc(firebaseApp.db, "user_groups", this.userStore.user.uid), (doc) => {
          const data = doc.data()
          const groupsArray = []
          Object.values(data).map((item) => {
            groupsArray.push(item)
          });
          groupsArray.sort((a, b) => {
            return b.last_checked - a.last_checked;
          })
          this.userGroups = groupsArray
        });
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
      },
      fetchSenderNameById(id) {
        let name = ""
        // Using the id, go get the name of the sender in firestore
        getDoc(doc(firebaseApp.db, "users", id)).then((doc) => {
           name = doc.data().displayName
        }).then(() => {
          console.log(name)
          return name
        })
            .catch((e) => {
              console.log(e)
              return ""
            })
      },
      compareDates(date1, date2) {
        console.log(date1, date2)
        return date1 < date2
      }
    },

    created() {
      this.fetchUserGroups()
    }
  }
</script>

<template>
  <div class="chatSelector" style="overflow-y: auto">
    <div v-if="userGroups" v-for="group in this.userGroups" v-on:change="console.log(group)" :key="group.id"
         @click="() => {
           chatStore.switchChat(group.id);
           this.updateLastChecked();
         }" :class="['userChat', {'chatSelected':this.chatStore.chatMessagesId === group.id}]">
      <img :src="group.icon_url" alt="">
      <div class="userChatInfo">
        <span>{{ group.name }}</span>
        <p v-if="group.recent_message.text && group.recent_message.text.length > 0"
           :class="{ 'has-text-weight-bold': compareDates(group.last_checked, group.recent_message.read_by.sent_at)
        }">
          {{ (group.recent_message.read_by.sent_by === this.userStore.user.uid)?
            "Vous: " : ""
          }}
          {{ group.recent_message.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/components/chat.css";
/*.chatSelector {
  overflow-y: scroll;
  overflow-x: hidden;
}*/
</style>
