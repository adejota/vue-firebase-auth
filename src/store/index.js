import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import firebase from 'firebase/app'
import router from '@/router'

Vue.use(Vuex)

const initialState = () => {
    return {
        uid: null,
        user: null,
        error: null,
        loading: null,
        googleLoading: null,
        updating: null,
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

    getGoogleLoading(state) {
        return state.googleLoading
    },

    getUpdating(state) {
        return state.updating
    }
}

const mutations = {
    setUid(state, payload) {
        state.uid = payload
    },

    setUser(state, payload) {
        state.user = payload
    },

    setError(state, payload) {
        Vue.$toast.error(payload)
        state.error = payload
    },

    setLoading(state, payload) {
        state.loading = payload
    },

    setGoogleLoading(state, payload) {
        state.googleLoading = payload
    },

    setUpdating(state, payload) {
        state.updating = payload
    },

    clearState(state, payload) {
        state = payload
    }
}

const actions = {
    register({ commit, dispatch }, payload) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                dispatch('createUser', response.user)
            })
            .catch(error => {
                commit("setError", error.message)
                commit("setLoading", false)
            })
    },

    registerWithGoogle({ commit, dispatch }) {
        let provider = new firebase.auth.GoogleAuthProvider()

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((response) => {
                dispatch('createUser', response.user)
            })
            .catch(error => {
                commit("setError", error.message)
                commit("setGoogleLoading", false)
            })
    },

    login({ commit, dispatch }, payload) {
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                dispatch('loadUser', response.user)
            })
            .catch(error => {
                commit("setError", error.message)
                commit("setLoading", false)
            })
    },
    
    loginWithGoogle({ commit, dispatch }) {
        let provider = new firebase.auth.GoogleAuthProvider()

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((response) => {
                dispatch('loadUser', response.user)
            })
            .catch(error => {
                commit("setError", error.message)
                commit("setGoogleLoading", false)
            })
    },

    forgotPassword({ commit }, payload) {
        console.log(payload.email)

        firebase
            .auth()
            .sendPasswordResetEmail(payload.email)
            .then(() => {
                Vue.$toast.success('Password recovery e-mail sent successfully')
                commit("setLoading", false)
            })
            .catch(error => {
                commit("setError", error.message)
                commit("setLoading", false)
            })
    },

    logout({ commit }) {
        firebase
            .auth()
            .signOut()
            .then(() => {
                commit('setUser', null)
                commit('clearState', null)
                router.push({ path: '/login' })
                commit("setLoading", false)
            })
            .catch(error => {
                commit("setError", error.message)
                commit("setLoading", false)
            })
    },

    async createUser({ commit }, user) {
        let payload = 
        {
            email: user.email,
            photo: user.photoURL
        }

        try {
            const res = await Vue.prototype.$http.put(`data/users/${user.uid}.json`, payload)
            if (res) {
                commit("setUser", payload)
                commit("setUid", user.uid)
                router.push({ path: '/home' })
                commit("setLoading", false)
                commit("setGoogleLoading", false)
            }
        } catch (error) {
            commit("setError", error.message)
        }
    },

    async loadUser({ commit }, user) {
        try {
            const res = await Vue.prototype.$http.get(`data/users/${user.uid}.json`)
            if (res.data) {
                commit("setUser", res.data)
                commit("setUid", user.uid)
                router.push({ path: '/home' })
                commit("setLoading", false)
                commit("setGoogleLoading", false)
            } else {
                commit('setUser', null)
                commit('clearState', null)
                commit("setError", 'There is no user record correspoding to this identifier. The user may have been deleted')
                commit("setGoogleLoading", false)
            }
        } catch (error) {
            commit("setError", error.message)
        }
    },

    async updateUser({ commit, state }, payload) {
        try {
            const res = await Vue.prototype.$http.put(`data/users/${state.uid}.json`, payload)
            if (res) {
                Vue.$toast.success('User updated successfully')
                commit("setUpdating", false)
            }

            return true
        }
        catch (error) {
            commit("setError", error.message)
            commit("setUpdating", false)
        }
    }
}

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: initialState(),
    getters,
    mutations,
    actions,
})
