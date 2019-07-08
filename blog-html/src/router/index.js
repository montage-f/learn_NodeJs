import Vue from 'vue';
import Router from 'vue-router';
import {localStore} from '../config';

import Login from '../views/login.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/add-blog',
            name: 'AddBlog',
            component: () => import('../views/AddBlog.vue')
        },
        {
            path: '/edit-blog',
            name: 'EditBlog'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
    ]
});
router.beforeEach((to, from, next) => {
    let userInfo = localStore.get('userInfo');
    if (userInfo) {
        next();
        return;
    }
    
    if (to.path !== '/login' && !userInfo) {
        next('/login');
        return;
    }
    next();
});
export default router;
