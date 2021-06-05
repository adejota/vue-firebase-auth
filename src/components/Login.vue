<template>
    <v-form ref="form" v-model="valid" @submit.prevent="submit()"
        class="primary px-4 py-8 d-flex justify-center"
    >
        <v-responsive max-width="500px">
            <p class="text-h5 textColor--text">Login</p>

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
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                required
                color="textColor"
            />

            <v-btn :disabled="!valid" @click="submit"
                :loading="getLoading()"
                class="mt-4" block
                color="textColor primary--text"
            >
                Sign in
            </v-btn>

            <v-btn link
                class="mt-4 mb-4" block outlined
                color="textColor"
                @click="$router.push({ path: '/register', name: 'Register', params: { email, password } })"
            >
                Create account
            </v-btn>

            <div class="d-flex justify-center align-center mb-4">
                <span @click="$router.push({ path: '/forgot-password', name: 'ForgotPassword', params: { email } })"
                    class="text-caption text-center pointer textColor--text">
                    Forgot password?
                </span>
            </div>

            <v-divider></v-divider>

            <v-btn @click="googleLogin()"
                class="mt-4 mb-4" block
                color="secondary primary--text"
                :loading="getGoogleLoading()"
            >
                <v-icon left color="primary">mdi-google</v-icon>
                Sign in with google
            </v-btn>

        </v-responsive>
    </v-form>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex"

export default {
    data: () => ({
        valid: true,
        loading: false,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        show: false,
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 6 || 'Min 6 characters',
        ],
    }),

    methods: {
        ...mapActions(['login', 'loginWithGoogle']),
        ...mapMutations(['setLoading', 'setGoogleLoading']),
        ...mapGetters(['getLoading', 'getGoogleLoading']),

        submit() {
            this.setLoading(true)
            this.login({ email: this.email, password: this.password })
        },

        googleLogin() {
            this.setGoogleLoading(true)
            this.loginWithGoogle()
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