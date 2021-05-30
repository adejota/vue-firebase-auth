<template>
    <v-form ref="form" v-model="valid" @submit.prevent="submit()"
        class="pa-2 pa-sm-8"
    >
        <v-card class="pa-4">
            <v-card-title>Login</v-card-title>

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
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    required
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" color="success" @click="submit"
                    :loading="getLoading()"
                >
                    Login
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
        ...mapActions(["login"]),
        ...mapMutations(["setLoading"]),
        ...mapGetters(['getLoading']),

        submit() {
            this.setLoading(true),
            this.login({ email: this.email, password: this.password })
        },
    },
}
</script>

<style>
</style>