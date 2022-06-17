<template>
    <div class='app'>
        
        <Nav />

        <Hamburger />

        <router-view />

    </div>
</template>

<script>
    import Nav from '../src/components/Nav.vue';
    import Hamburger from '../src/components/Hamburger';
    import axios from 'axios';
    import router from './router';

    import { mapGetters } from 'vuex';

    export default {
        name: 'app',
        
        components: {
            Nav,
            Hamburger,
        },

        computed: mapGetters(['isLogged']),

        mounted() {
            axios.interceptors.request.use((config) => {
                
                config.headers.Authorization= "Bearer " + localStorage.getItem('accessToken') || '';
                return config;
            });

            if(!this.isLogged) {
                router.push({path: '/login'})
            }
        }
    }
</script>

<style lang='css'>
    .app {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        color: #ffffff;
    }

    h1 {
        font-size: 50px;
    }
</style>