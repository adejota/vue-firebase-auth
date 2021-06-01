<template>
    <v-main class="px-4 py-8">
        <p class="text-h5">User information</p>

        <div class="d-flex flex-column mb-4" v-for="(item, name) in user" :key="name">
            <strong><span>{{ name }}</span></strong>
            <span >{{ item ? item : 'null' }}</span>
        </div>
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