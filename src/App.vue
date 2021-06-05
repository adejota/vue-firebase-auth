<template>
    <v-app id="app">
        <AppBar />
        <v-main id="main">
            <v-fade-transition mode="out-in">
                <router-view />
            </v-fade-transition>
        </v-main>
    </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'

export default {
    name: 'App',

    components: { AppBar },
}
</script>
