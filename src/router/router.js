import { createRouter, createWebHistory } from "vue-router";

// Import routes
import HomeView from "../views/HomeView.vue";
import * as path from "path";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

export const router = createRouter({
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
                noNav: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView
        }
    ]
})
