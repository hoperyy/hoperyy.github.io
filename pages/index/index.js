import Vue from 'vue';
import VueRouter from 'vue-router';

import './index.less';

import Main from './routes/Main.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/',
        component: Main,
    }],
});

new Vue({
    router,
}).$mount('#app');
