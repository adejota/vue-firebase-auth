<template>
    <v-form ref="form" v-model="valid" @submit.prevent="submit()"
        class="px-4 py-8 d-flex justify-center"
    >
        <v-responsive max-width="500px">
            <p class="text-h5">Login</p>

            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                type="email"
                required
            />

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                required
            />

            <v-btn :disabled="!valid" @click="submit"
                :loading="getLoading()"
                class="mt-4" block
                color="primary"
            >
                Sign in
            </v-btn>

            <v-btn link to="/register"
                class="mt-4 mb-4" block outlined
                color="primary"
            >
                Create account
            </v-btn>

            <p class="text-caption text-center pointer"
                
            >
                Forgot password?
            </p>

            <v-divider></v-divider>

            <v-btn @click="loginWithGoogle"
                class="mt-4 mb-4" block
                color="secondary"
            >
                <v-icon dark left>mdi-google</v-icon>
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
        ...mapMutations(['setLoading']),
        ...mapGetters(['getLoading']),

        submit() {
            this.setLoading(true),
            this.login({ email: this.email, password: this.password })
        },
    },
}
</script>

<style scoped>
.pointer:hover {
    cursor: pointer;
    color: #000;
}
</style>