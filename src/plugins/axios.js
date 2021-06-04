import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://vue-firebase-auth-1b260-default-rtdb.firebaseio.com/'
        })
    }
})