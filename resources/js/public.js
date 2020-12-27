window.Vue = require('vue');
import VueRouter from 'vue-router'
import './helpers/mixin';
import Vuex from 'vuex'
import axios from 'axios';
import StoreData from './store/PublicStore'
import filter from './Filter/Fitler'
import {routes} from "./router/PublicRoutes";

Vue.use(Vuex)
const store = new Vuex.Store(StoreData)

// axios for global uses
window.axios = axios;

// vue filter for time

// vue router
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    'mode': 'history'
})

Vue.component('master' , require('./components/public/Master').default);

const app = new Vue({
    el: '#content',
    router,
    store
});
