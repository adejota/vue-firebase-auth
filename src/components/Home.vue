<template>
    <v-main class="pa-2 pa-sm-8">
        <v-card class="pa-4">
            <v-card-title>User information</v-card-title>

            <v-card-text>
                <div class="d-flex flex-column mb-4" v-for="(item, name) in user" :key="name">
                    <strong><span>{{ name }}</span></strong>
                    <span >{{ item ? item : 'null' }}</span>
                </div>
            </v-card-text>
        </v-card>
    </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Home',

    data() {
        return {
            user: null,
        }
    },

    computed: {
        ...mapGetters(['getUser', 'isUserAuth'])
    },

    mounted() {
        this.user = this.getUser.providerData[0]
    }
}
</script>

<style>

</style>