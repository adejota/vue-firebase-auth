<template>
    <v-app-bar
      app
      class="textColor"
    >
        <span class="text-h5 text--text">🔥</span>

        <v-spacer></v-spacer>

        <v-btn v-if="isUserAuth"
            :loading="getLoading()"
            @click="setLoading(true), logout()"
            text
            class="primary--text"
        >
            Logout
            <v-icon right>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    name: 'AppBar',

    data() {
        return {
            navItems: [
                { name: 'Login', to: '/login', icon: 'mdi-lock' },
                { name: 'Register', to: '/register', icon: 'mdi-key' },
            ]
        }
    },
    
    computed: {
        ...mapGetters(['getUser', 'isUserAuth'])
    },

    methods: {
        ...mapActions(['logout']),
        ...mapMutations(["setLoading"]),
        ...mapGetters(['getLoading'])
    }
}
</script>

<style>

</style>