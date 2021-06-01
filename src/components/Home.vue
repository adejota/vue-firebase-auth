<template>
    <v-main class="px-4 py-8">
        <div class="d-flex justify-center">
            <v-responsive max-width="500px">
                <div class="d-flex flex-column align-center mb-4">
                    <v-avatar size="100" color="primary">
                        <v-img v-if="this.getUser.photoURL" 
                            :src="this.getUser.photoURL"
                        />
                        <span v-else class="white--text text-h4 text-uppercase">{{ userInitials(this.getUser.email) }}</span>
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
            </v-responsive>
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

    methods: {
        userInitials(email) {
            let _email = email.split('')
            return _email[0] + _email[1]
        }
    },

    mounted() {
        this.user = this.getUser.providerData[0]
    }
}
</script>

<style>

</style>