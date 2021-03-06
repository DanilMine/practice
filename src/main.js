import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './components/App'
import Students from './components/Students'
import StudentInfo from './components/StudentInfo'
import Login from './components/Login'

import store from './store'

const routes = [
    { path: '/', component: Students, meta: { requiresAuth: true } },
    { path: '/student-info/:id', component: StudentInfo, props: true, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
]

const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.getUser === null) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    el: '#app',
    router,
    store,
})