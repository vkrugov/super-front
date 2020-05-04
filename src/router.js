import Vue from 'vue'
import store from './store';
import VueRouter from 'vue-router'
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Heroes from "./pages/Heroes";
import NewHero from "./pages/NewHero";
import Users from "./pages/Users";
import Gallery from "./pages/Gallery";
import UpdateHero from "./pages/UpdateHero";

Vue.use(VueRouter);
import {USER_LOAD} from "./store/actions/auth.actions";

const isAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/');
};

const isNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/dashboard');
};

const router =  new VueRouter ({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/heroes',
            component: Heroes,
            name: 'products',
            children: [
                {
                    path: '/new-hero',
                    component: NewHero,
                    name: 'newHero',
                    beforeEnter: isAuthenticated,
                },
                {
                    path: '/update-hero',
                    component: UpdateHero,
                    name: 'updateHero',
                    beforeEnter: isAuthenticated,
                },
                {
                    path: '/gallery',
                    component: Gallery,
                    name: 'gallery',
                }
            ]
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
            beforeEnter: isNotAuthenticated
        },
        {
            path: '/users',
            component: Users,
            name: 'users',
            beforeEnter: isAuthenticated,
            children: [
                {
                    path: '/register',
                    component: Register,
                    name: 'register',
                }
            ]
        },
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    store.state.user.error = '';
    store.state.hero.error = '';
    if (store.getters.isAuthenticated) {
        store.dispatch(USER_LOAD)
            .catch(() => {
                next('/')
            });
    }
    next();
});

export default router