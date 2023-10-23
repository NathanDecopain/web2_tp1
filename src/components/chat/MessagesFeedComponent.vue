<script>
import Message from "./Message.vue";
import {useUserStore} from "../../stores/userStore.js";
import {collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, Timestamp, where} from "firebase/firestore";
import {firebaseApp} from "../../firebaseSetup/firebaseConfig.js";

export default {
  components: {Message},
  setup() {
    return {
      userStore: useUserStore(),
      chatStore: useUserStore()
    }
  },
  data() {
    return {
      messages: [],
      member_ids: [],
      memberMetadata: {}
    }
  },
  methods: {
    async fetchMessagesAndInfo() {
      // Fetch chat info
      const unsubscribeMessages = await onSnapshot(doc(firebaseApp.db, "group_messages", this.chatStore.chatMessagesId), (doc) => {
        this.messages = doc.data().messages
        console.log(doc.data())

        // Update last_checked
        this.updateLastChecked()
      });

      // const unsubscribeInfo = await query()

      // fetch member metadata
      const unsubscribeMemberMetadata = await onSnapshot(doc(firebaseApp.db, "groups", this.chatStore.chatMessagesId), async (doc) => {
        await this.updateLastChecked()
        const memberIds = Object.keys(doc.data().members)
        const memberMetadata = {};
        (await getDocs(query(
            collection(firebaseApp.db, "users"),
            where("user_uid", "in", memberIds)))).forEach((doc) => {
              memberMetadata[doc.id] = doc.data()
        })
        this.memberMetadata = memberMetadata
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
    },
    scrollChatToBottom() {
      const chat = this.$refs.messagesFeed
      // First check the user's scroll position
      const currentScrollingPosition = chat.scrollTop
      let lastElementOffsetHeight = 0;
      if (chat.lastElementChild !== null) {
        lastElementOffsetHeight = chat.lastElementChild.offsetHeight
      }
      const autoScrollTriggerLargerThan = chat.scrollHeight - (chat.clientHeight*2 + lastElementOffsetHeight) - 100
      /*console.log(`currentScrollingPosition = ${currentScrollingPosition}\n
                    autoScrollTriggerLargerThan = ${autoScrollTriggerLargerThan}\n
                    elementBottom = ${chat.scrollHeight}
                    chatClientHeight = ${chat.clientHeight}
                    chatLastElementChildHeight = ${chat.lastElementChild.offsetHeight}\n`)*/
      if (!this.userStore.initialScrollDone) {
        setTimeout(() => {
          chat.scrollTo({behavior: "instant", top: chat.scrollHeight})
        }, 50)
        this.userStore.initialScrollDone = true
      }
      // If user's scroll position is higher than a certain threshold, don't auto scroll
      if (currentScrollingPosition >= autoScrollTriggerLargerThan) {
         chat.scrollTo({behavior: "smooth", top: chat.scrollHeight})
      }
      // If user's scroll position is lower than a certain threshold, auto scroll
    }
  },
  created() {
    this.fetchMessagesAndInfo().then(() => {
      this.scrollChatToBottom()
    })
    this.chatStore.$subscribe((newValue) => {
      this.fetchMessagesAndInfo()
    })
  },
  async beforeMount() {
    await this.fetchMessagesAndInfo()
  },
  mounted() {
    const observeChat = new MutationObserver(this.scrollChatToBottom)
    observeChat.observe(this.$refs.messagesFeed, { childList: true })
  }
}
</script>

<template>
  <div ref="messagesFeed" class="messagesFeed">
    <div v-if="this.messages && this.messages.length > 0 && this.memberMetadata" v-for="message in messages" :class="['chatMessage', {'owner': message.sent_by === this.userStore.user.uid}]">
      <!--HANDLE DAY CHANGES <div v-if="message.sent_at.toDate().getDay()"></div>-->
      <Message :timestamp="message.sent_at.toDate()"
               :senderId="message.sent_by"
               :sender="this.memberMetadata[message.sent_by].displayName"
               :photoUrl="this.memberMetadata[message.sent_by].photoURL"
               :text="message.text"></Message>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/components/chat.css";
.messagesFeed {
  background-image: url("/backgrounds/signup_bg_backdrop.png");
  background-size: cover;
  padding: 10px;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
