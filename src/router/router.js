import { createRouter, createWebHistory } from "vue-router";

// Import routes
import HomeView from "../views/HomeView.vue";
import * as path from "path";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ConversationsView from "../views/ConversationsView.vue";
import ProfileView from "../views/ProfileView.vue";
import {useUserStore} from "../stores/userStore.js";
import {firebaseApp} from "../firebaseSetup/firebaseConfig.js";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/register',
            name: 'SignUp',
            component: RegisterView,
            meta: {
                // noNav: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/conversations',
            name: 'Conversations',
            component: ConversationsView,
            meta: {
                noNav: true,
                requiresAuth: true
            }
        },
        {
            path: '/profil',
            name: 'Profil',
            component: ProfileView,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

export { router }
