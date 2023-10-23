<script>
import {findOneOnOneChatRoomDocs, findUsersByString} from "../../firebaseSetup/firestore/queries.js";
import {
  doc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  arrayUnion,
  getDoc, where, query
} from "firebase/firestore"
import {useUserStore} from "../../stores/userStore.js";
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
      queryString: "",
      resultUsers: []
    }
  },
  methods: {
    async searchForUsers() {
      if (!this.queryString) {
        this.resultUsers = []
      }
      try {
        let results = [];
        const querySnapshot = await getDocs(findUsersByString(this.queryString));
        querySnapshot.forEach((doc) => {
          results.push(doc.data())
        })
        this.resultUsers = results
      } catch(e) {
        console.log(e)
      }
    },
    async handleSelect(selectedUser) {
      // Check whether the group exists or not
      const chatRoom = await findOneOnOneChatRoomDocs(this.userStore.user.uid, selectedUser.user_uid);
      // console.log(chatRoom.docs)
      if(chatRoom.empty) {
        // Create a group in groups collection
        const docRef = await addDoc(collection(firebaseApp.db, "groups"), {
          created_by: this.userStore.user.uid,
          created_at: serverTimestamp(),
          icon_url: selectedUser.photoURL,
          members: {
            [this.userStore.user.uid]: true,
            [selectedUser.user_uid]: true
          },
          isGroupChat: false,
          recent_message: {
            text: "",
            read_by: {
              sent_by: null,
              sent_at: null
            }
          }
        })

        await updateDoc(docRef, {group_id: docRef.id});

        const groupMessagesRef = doc(collection(firebaseApp.db, "group_messages"), docRef.id)
        // Create document for group messages
        await setDoc(groupMessagesRef, {
          messages: []
        })

        // Create document in user_groups
        await getDoc(docRef)
            .then((snapShot) => snapShot.data())
            .then((snapShot) => {
              Object.keys(snapShot.members).forEach((member_id) => {
                const userGroupsRef = doc(collection(firebaseApp.db, "user_groups"), member_id)
                setDoc(userGroupsRef, {
                [docRef.id]: {
                    id: docRef.id,
                    name: (this.userStore.user.uid === member_id) ? selectedUser.displayName : this.userStore.user.displayName,
                    owner: (this.userStore.user.uid === member_id) ? this.userStore.user.uid : selectedUser.user_uid,
                    recent_message: {
                      text: "",
                      read_by: {
                        sent_by: null,
                        sent_at: null
                      }
                    },
                    last_checked: null,
                    icon_url: (this.userStore.user.uid === member_id) ? selectedUser.photoURL : this.userStore.user.photoURL
                  }
                }, {merge: true})
        })
      })
        await this.chatStore.switchChat(docRef.id)
        // Flush search results
        this.queryString = null;
        this.resultUsers = null;
      } else {
        // Get the corresponding chat and switch it in main window
        // ?
        const chatMessagesRef = await findOneOnOneChatRoomDocs(this.userStore.user.uid, selectedUser.user_uid)
        const chatMessagesId = chatMessagesRef.docs[0].id
        await this.chatStore.switchChat(chatMessagesId)
      }

      // Flush search results
      this.queryString = null;
      this.resultUsers = null;
    }
  }
}

</script>

<template>
<div class="search">
  <div class="searchForm">
    <input v-model="this.queryString" @input="searchForUsers()" class="" placeholder="Trouver un utilisateur" type="text">
  </div>
  <div style="max-height: 50vh; overflow-y: auto">
    <div v-if="this.queryString" v-for="user in resultUsers" @click ="handleSelect(user)" class="userChat userInSearch">
      <img alt="" :src="user.photoURL">
      <div class="userChatInfo">
        <span>{{ user.displayName }}</span>
        <p>@{{ user.username }}</p>
      </div>
    </div>
    <div v-if="this.queryString && this.resultUsers.length === 0" class="userChat">
      <p>Aucun utilisateur n'ayant ce nom</p>
    </div>
  </div>
</div>
</template>

<style scoped>
@import "/src/styles/components/chat.css";
</style>
