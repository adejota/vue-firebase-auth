<template>
    <v-main class="px-4 py-8">
        <!-- <p class="text-h5">User information</p> -->

        <div class="d-flex flex-column align-center mb-4">
            <v-avatar size="100">
                <v-img v-if="this.getUser.photoURL" 
                    :src="this.getUser.photoURL"
                />
                <v-icon v-else large color="primary">mdi-account-circle</v-icon>
            </v-avatar>
        </div>

        <div class="d-flex flex-column align-start mb-4">
            <strong><span>Name:</span></strong>
            <span>{{ this.getUser.displayName ? this.getUser.displayName : 'Uninformed' }}</span>
        </div>

        <div class="d-flex flex-column mb-4">
            <strong><span>E-mail:</span></strong>
            <span>{{ this.getUser.email }}</span>
        </div>

        <div class="d-flex flex-column mb-4">
            <strong><span>Phone number:</span></strong>
            <span>{{ this.getUser.phoneNumber ? this.getUser.phoneNumber : 'Uninformed' }}</span>
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