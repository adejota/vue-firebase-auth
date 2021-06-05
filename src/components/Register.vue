<template>
    <v-form id="register" ref="form" v-model="valid" @submit.prevent="submit()"
        class="primary px-4 py-8 d-flex justify-center"
    >
        <v-responsive max-width="500px">
            <p class="text-h5 textColor--text">Create account</p>

            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                type="email"
                required
                color="textColor"
            />

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
                color="textColor"
            />

            <v-text-field
                v-model="repeatPassword"
                :rules="repeatPasswordRules"
                label="Repeat password"
                :type="showRepeatPassword ? 'text' : 'password'"
                :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showRepeatPassword = !showRepeatPassword"
                required
                color="textColor"
            />

            <v-btn @click="submit"
                :loading="getLoading()"
                class="mt-4 mb-4" block
                color="textColor primary--text"
                :disabled="!valid"
            >
                Sign up
            </v-btn>

            <div class="d-flex justify-center align-center mb-4">
                <span class="text-caption text-center pointer" link
                    @click="$router.push('/login')"
                >
                    Back to login
                </span>
            </div>

            <v-divider></v-divider>

            <v-btn @click="googleRegister()"
                class="mt-4 mb-4" block
                color="secondary"
                :loading="getGoogleLoading()"
            >
                <v-icon dark left>mdi-google</v-icon>
                Sign up with google
            </v-btn>
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
        let password = this.$route.params.password
        
        if (email) {
            this.email = email
        }

        if (password) {
            this.password = password
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
        ...mapActions(['register', 'registerWithGoogle']),
        ...mapMutations(["setLoading", 'setGoogleLoading']),
        ...mapGetters(['getLoading', 'getGoogleLoading']),

        submit() {
            this.setLoading(true)
            this.register({ email: this.email, password: this.password })
        },

        googleRegister() {
            this.setGoogleLoading(true)
            this.registerWithGoogle()
        },
    },
}
</script>

<style scoped>
#register {
    height: 90vh;
}

.pointer:hover {
    cursor: pointer;
    color: black;
    font-weight: bold;
    transition: all .3s ease;
}
</style>