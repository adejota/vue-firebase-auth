<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <div class="d-flex align-center">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                transition="scale-transition"
                width="40"
            />

            <span>Vue Firebase Auth</span>
        </div>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.breakpoint.smAndUp">
            <template v-if="!isUserAuth">
                <v-btn text v-for="(item, i) in navItems" :key="i"
                    :to="item.to"
                >
                    <v-icon class="mr-2" small>{{ item.icon }}</v-icon>
                    <span>{{ item.name }}</span>
                </v-btn>
            </template>

            <v-btn v-else text @click="logout()">
                <v-icon class="mr-2" small>mdi-logout</v-icon>
                <span>Logout</span>
            </v-btn>
        </template>

        <template v-else>
            <v-menu
                left
                bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item-group v-if="!isUserAuth">
                        <v-list-item v-for="(item, i) in navItems" :key="i"
                            :to="item.to"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>

                    <v-list-item v-else @click="logout()">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
    }
}
</script>

<style>

</style>