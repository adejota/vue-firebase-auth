<template>
    <v-footer app class="d-flex justify-center align-center">
        <p class="ma-2 text-caption">
            2021 — Made by 
            <a href="http://github.com/adejota" target="_blank"
                class="github-link text-decoration-none primary--text"
            >
                adejota
            </a>
        </p>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
}
</script>

<style scoped>
.github-link:hover {
    color: black;
    font-weight: bold;
    transition: all .3s ease;
}
</style>