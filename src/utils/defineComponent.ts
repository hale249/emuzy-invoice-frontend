import { defineAsyncComponent } from 'vue';

export function registerGlobalComponent(app: any) {
    app.component('public-layout', defineAsyncComponent(() => import('@/layouts/Blank.vue')));
    app.component('default-layout', defineAsyncComponent(() => import('@/layouts/Default.vue')));
}