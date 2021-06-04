<template>
    <v-main class="px-4 py-8">
        <div class="d-flex justify-center">
            <v-responsive max-width="500px">
                <div class="d-flex flex-column align-center mb-4">
                    <v-avatar size="100" color="primary">
                        <v-img v-if="getUser.photo" 
                            :src="getUser.photo"
                        />
                        <span v-else class="white--text text-h4 text-uppercase">{{ userInitials(getUser.email) }}</span>
                    </v-avatar>
                </div>

                <v-text-field
                    v-model="getUser.name"
                    label="Name"
                    type="text"
                />

                <v-text-field
                    v-model="getUser.email"
                    label="E-mail"
                    type="email"
                />

                <v-text-field
                    v-model="getUser.phone"
                    label="Phone"
                    type="text"
                />

                <v-text-field
                    v-model="getUser.addressCode"
                    label="Address code"
                    type="text"
                />

                <v-btn @click="save()"
                    class="mt-4" block
                    color="primary"
                    :loading="getUpdating"
                >
                    Save
                </v-btn>
            </v-responsive>
        </div>
    </v-main>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Home',

    computed: {
        ...mapGetters(['getUser', 'getUpdating'])
    },

    methods: {
        ...mapActions(['updateUser']),
        ...mapMutations(['setUpdating']),

        userInitials(email) {
            let _email = email.split('')
            return _email[0] + _email[1]
        },

        save() {
            this.setUpdating(true)
            this.updateUser(this.getUser)
        }


    },
}
</script>

<style>

</style>