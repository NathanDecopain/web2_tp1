import { createRouter, createWebHistory } from "vue-router";

// Import routes
import HomeView from "../views/HomeView.vue";
import * as path from "path";
import SignUpView from "../views/SignUpView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        }, // TODO: Switch out with a proper homepage
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUpView,
            meta: {
                noNav: true
            }
        }
    ]
})
