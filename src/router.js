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
                },
                {
                    path: '/update-hero',
                    component: UpdateHero,
                    name: 'updateHero',
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
            name: 'login'
        },
        {
            path: '/users',
            component: Users,
            name: 'users',
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