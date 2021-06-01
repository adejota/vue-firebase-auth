<template>
    <v-app id="app">
        <v-main id="main">
            <AppBar />
            <v-fade-transition mode="out-in">
                <router-view />
            </v-fade-transition>
            <Footer />
        </v-main>
    </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
import Footer from '@/components/Footer'

export default {
    name: 'App',

    components: { AppBar, Footer },
}
</script>

<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}

#app {
    height: 100vh;
}
</style>
