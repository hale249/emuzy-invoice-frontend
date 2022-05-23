import {createWebHistory, createRouter, RouterOptions, RouteLocationNormalized, NavigationGuard} from "vue-router";
import Login from '@/pages/authentication/login.vue';
import process from 'process';
import componentsRouter from './route';

let defaultRouter: Array<Object> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login',
            layout: 'public',
        },
        component: Login,
    },
];

const routes = [...defaultRouter, ...componentsRouter];
const router = createRouter(<RouterOptions>{
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const DEFAULT_TITLE = 'Some Default Title';
router.beforeEach((to: RouteLocationNormalized, from:RouteLocationNormalized, next: NavigationGuard) => {
    // @ts-ignore
    document.title = to.meta.title || DEFAULT_TITLE;
});


export default router;