<template>
    <v-form ref="form" v-model="valid" @submit.prevent="submit()"
        class="primary px-4 py-8 d-flex justify-center"
    >
        <v-responsive max-width="500px">
            <p class="text-h5 textColor--text">Forgot password</p>

            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                type="email"
                required
                color="textColor"
            />

            <v-btn @click="submit"
                :loading="getLoading()"
                class="mt-4 mb-4" block
                color="textColor primary--text"
                :disabled="!valid"
            >
                Send new password
            </v-btn>

            <div class="d-flex justify-center align-center mb-4">
                <span class="text-caption text-center pointer" link
                    @click="$router.push('/login')"
                >
                    Back to login
                </span>
            </div>
        </v-responsive>
    </v-form>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex"

export default {
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        showPassword: false,
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 6 || 'Min 6 characters',
        ],
        showRepeatPassword: false,
        repeatPassword: '',
    }),

    mounted() {
        let email = this.$route.params.email
        
        if (email) {
            this.email = email
        }
    },

    computed: {
        repeatPasswordRules() {
            if (this.repeatPassword.length > 0) {
                if (this.repeatPassword === this.password) {
                    return [true]
                } else {
                    return ['Passwords do not match']
                }
            } else {
                return ['Repeat password is required']
            }
        }
    },

    methods: {
        ...mapActions(['forgotPassword']),
        ...mapMutations(["setLoading"]),
        ...mapGetters(['getLoading']),

        submit() {
            this.setLoading(true)
            this.forgotPassword({ email: this.email })
        },
    },
}
</script>

<style scoped>
.pointer:hover {
    cursor: pointer;
    color: black;
    font-weight: bold;
    transition: all .3s ease;
}
</style>
