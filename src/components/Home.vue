<template>
    <v-container class="px-4 py-8">
        <div class="d-flex justify-center">
            <v-responsive max-width="500px">
                <div class="d-flex flex-column align-center mb-4">
                    <v-avatar size="100" color="textColor">
                        <v-img v-if="getUser.photo" 
                            :src="getUser.photo"
                        />
                        <span v-else class="primary--text text-h4 text-uppercase">{{ userInitials(getUser.email) }}</span>
                    </v-avatar>
                </div>

                <p class="pa-0 ma-0 text-subtitle-2">E-mail</p>
                <p>{{ getUser.email }}</p>

                <v-text-field
                    v-model="getUser.name"
                    label="Name"
                    type="text"
                    color="textColor"
                />

                <v-text-field
                    v-model="getUser.phone"
                    label="Phone"
                    type="text"
                    color="textColor"
                />

                <v-text-field
                    v-model="getUser.addressCode"
                    label="Address code"
                    type="text"
                    color="textColor"
                />

                <v-btn @click="save()"
                    class="mt-4 mb-4" block
                    color="textColor primary--text"
                    :loading="getUpdating"
                    :disabled="disabled"
                >
                    {{ disabled ? 'There are no changes' : 'Save'}}
                </v-btn>
            </v-responsive>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Home',

    data: () => ({
        userInititalState: null,
        disabled: true,
        windowSize: { x: 0, y: 0 }
    }),

    computed: {
        ...mapGetters(['getUser', 'getUpdating'])
    },

    watch: {
        getUser: {
            deep: true,
            handler(val) {
                if (this.$_.isEqual(val, this.userInititalState)) {
                    this.disabled = true
                } else {
                    this.disabled = false
                }
            }
        },
    },

    methods: {
        ...mapActions(['updateUser']),
        ...mapMutations(['setUpdating']),

        userInitials(email) {
            let _email = email.split('')
            return _email[0] + _email[1]
        },

        async save() {
            this.setUpdating(true)
            await this.updateUser(this.getUser)
                .then(res => {
                    this.disabled = res
                })
        }
    },

    mounted() {
        this.userInititalState = this.$_.cloneDeep(this.getUser)
    }
}
</script>
