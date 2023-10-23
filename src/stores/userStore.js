import { defineStore } from 'pinia'
import {useLocalStorage} from "@vueuse/core";
import {firebaseApp} from "../firebaseSetup/firebaseConfig.js";
import {router} from "../router/router.js";
import {doc, getDoc, setDoc, Timestamp} from "firebase/firestore";

export const useUserStore = defineStore('user', {
    state: () => ({
        // TODO: Make sure auth persistence is working appropriately (e. g. resets loggedin status once auth expires, logs out...)
        user: useLocalStorage("user", {}),
        chatMessagesId: useLocalStorage("chatMessagesId", {}),
    }),
    getters: {
        // TODO: User Getters
    },
    actions: {
        logOut() {
            firebaseApp.auth.signOut().then(
            r => {
                this.$state.user = {}
                this.removeChat()
            }).then(_ => router.push("/"))
        },
        async switchChat(newChatMessagesId) {
            this.$state.chatMessagesId = newChatMessagesId;
            await this.updateLastChecked()
        },
        removeChat() {
            this.$state.chatMessagesId = null
        },
        async updateLastChecked() {
            const groupRef = doc(firebaseApp.db, "user_groups", this.$state.user.uid)
            await setDoc(groupRef, {
                [this.state.chatMessagesId]: {
                    id: this.$state.chatMessagesId,
                    last_checked: Timestamp.now()
                }
            }, { merge: true })
            console.log((await getDoc(groupRef)).data())
        },
        async isUserLoggedIn() {
            return !!firebaseApp.auth.currentUser
        }
    },
})
