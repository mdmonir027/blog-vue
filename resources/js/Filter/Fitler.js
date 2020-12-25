import vue from 'vue';

window.Vue = require('vue');
import moment from 'moment';

Vue.filter('time', (timeString) => {
    return moment(timeString).format(' Do MMM YYYY');
})

Vue.filter('firstUpperCase' , (value)=>{
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('subToString' , (value, length)=>{
    return value.substring(0 , length);
});
