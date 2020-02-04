import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css';
import axios from 'axios'
Vue.use(Ionic);
Vue.config.productionTip = false;
Vue.prototype.$http= axios
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

