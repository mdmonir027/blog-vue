import ExampleComponent from "./components/ExampleComponent";

require('./bootstrap');


import VueRouter from 'vue-router'
Vue.use(VueRouter)

// vue routes
const routes = [
    { path: '/foo', component: ExampleComponent },
]

const router = new VueRouter({
    routes
})


window.Vue = require('vue');




Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app;',
});
