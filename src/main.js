import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import router from './router'
import store from './store'
import "@/plugins/firebase"
import "@/plugins/vue-toastifications"

import _ from 'lodash'
Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.config.productionTip = false

new Vue({
    vuetify,
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
