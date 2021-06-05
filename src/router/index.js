import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            ifLoggedRedirectHome: true,
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            ifLoggedRedirectHome: true,
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!store.getters.isUserAuth) {
            router.push('login')
        }
    }

    if (to.meta.ifLoggedRedirectHome) {
        if (store.getters.isUserAuth) {
            router.push('home')
        }
    }

    next()
})

export default router
