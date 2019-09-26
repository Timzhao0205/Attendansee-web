import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard'
import AttendanceTable from "./views/AttendanceTable";
import Signin from "./views/Signin";
import Privacy from "./views/Privacy"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
            props: true
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            props: true
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: Privacy,
            props: true
        },
        {
            path: '/dashboard/table/:id',
            name: 'attendancetable',
            component: AttendanceTable,
            props: true
        }
    ]
})
