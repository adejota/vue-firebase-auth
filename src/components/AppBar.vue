<template>
    <v-app-bar
      app
      dark
    >
        <span class="text-h5">🔥</span>

        <v-spacer></v-spacer>

        <v-btn v-if="isUserAuth"
            :loading="getLoading()"
            @click="setLoading(true), logout()"
            dark text
        >
            <v-icon left dark>mdi-logout</v-icon>
            Logout
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