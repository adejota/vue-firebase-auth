<template>
    <v-form ref="form" v-model="valid" @submit.prevent="submit()"
        class="pa-2 pa-sm-8"
    >
        <v-card class="pa-4">
            <v-card-title>Register</v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    type="email"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="repeatPassword"
                    :rules="repeatPasswordRules"
                    label="Repeat password"
                    :type="showRepeatPassword ? 'text' : 'password'"
                    :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showRepeatPassword = !showRepeatPassword"
                    required
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" color="success" @click="submit"
                    :loading="getLoading()"
                >
                    Register
                </v-btn>
            </v-card-actions>
        </v-card>
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
        ...mapActions(["register"]),
        ...mapMutations(["setLoading"]),
        ...mapGetters(['getLoading']),

        submit() {
            this.setLoading(true)
            this.register({ email: this.email, password: this.password })
        },
    },
}
</script>

<style>
</style>