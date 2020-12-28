require('./bootstrap');
import VueRouter from 'vue-router'
import { routes } from "./router/routes";
import { Form, HasError, AlertError } from 'vform'


window.Vue = require('vue');
// v form
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

// Sweet Alert
import Swal from 'sweetalert2'

window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
window.Toast = Toast;

//  mixins
import './helpers/mixin';

// VueX
import Vuex from 'vuex'
import StoreData from './store/Store'

Vue.use(Vuex)
const store = new Vuex.Store(StoreData)

// Axios

import axios from 'axios';
window.axios = axios;

// vue filter for time
import filter from './Filter/Fitler'


//  ckeditor
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use(CKEditor);

// vue router
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    'mode': 'history'
})

router.beforeEach((to,from,next) => {

        document.title = to.meta.title
        next();

});

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store
});
