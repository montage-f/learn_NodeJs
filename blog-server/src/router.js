import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/login.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            
            path: '/',
            name: 'Home',
            component: () =>
                import('./views/Home.vue')
        }
    ]
});
