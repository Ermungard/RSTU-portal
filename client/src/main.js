import Vue from 'vue'
import VueRouter from 'vue-router'
import '../bower_components/material-design-lite/material.min.js'
import './style/main.css'
import login from './components/login'
import course from './components/course'
import books from './components/books'
import area from './components/area'
Vue.use(VueRouter)
/* eslint-disable no-new */
const router = new VueRouter({
    routes: [
        { path: '/auth', component: login },
        { path: '/courses', component: course },
        { path: '/books', component: books },
        { path: '/cabinet', component: area }
    ]
})
new Vue({
    el: '#app',
    router
})
