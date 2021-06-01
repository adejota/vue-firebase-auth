import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import firebase from 'firebase/app'
import router from '@/router'

Vue.use(Vuex)

const initialState = () => {
    return { 
        user: null,
        token: null,
        error: null,
        loading: null,
    }
}

const getters = {
    getUser(state) {
        return state.user
    },

    isUserAuth(state) {
        return !!state.user
    },

    getError(state) {
        return state.error
    },

    getLoading(state) {
        return state.loading
    },
}

const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },

    setToken(state, payload) {
        state.token = payload;
    },

    setError(state, payload) {
        state.error = payload;
    },

    setLoading(state, payload) {
        state.loading = payload;
    }
}

const actions = {
    register({ commit }, payload) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                commit("setUser", response.user)
                commit("setLoading", false)
                router.push({ path: '/home' })
            })
            .catch(error => {
                commit("setError", error.message)
                Vue.$toast.error(error.message)
                commit("setLoading", false)
            })
    },

    login({ commit }, payload) {
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                commit("setUser", response.user)
                commit("setLoading", false)
                router.push({ path: '/home' })
            })
            .catch(error => {
                commit("setError", error.message)
                Vue.$toast.error(error.message)
                commit("setLoading", false)
            })
    },

    loginWithGoogle({ commit }) {
        let provider = new firebase.auth.GoogleAuthProvider()

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((response) => {
                commit("setUser", response.user)
                commit("setToken", response.credential.accessToken)
                commit("setLoading", false)
                router.push({ path: '/home' })
            })
            .catch(error => {
                commit("setError", error.message)
                Vue.$toast.error(error.message)
                commit("setLoading", false)
            })
    },

    logout({ commit }) {
        firebase
            .auth()
            .signOut()
            .then(() => {
                commit("setUser", null)
                commit("setLoading", false)
                router.push({ path: '/login' })
            })
            .catch(error => {
                commit("setError", error.message)
                Vue.$toast.error(error.message)
                commit("setLoading", false)
            })
    }
}

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: initialState(),
    getters,
    mutations,
    actions,
})
