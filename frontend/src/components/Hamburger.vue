<template>
    <div v-if="isLogged">
        <button v-on:click="panel" class="hamburger">
            <span class="hamburger-box">
                <span class="hamburger-inner">
                </span>
            </span>
        </button>
        <div class="navigation">
            <router-link to="/newOrder">Nowe zamówienie</router-link>
            <router-link to="/orders">Zamówienia</router-link>
            <router-link to="/newUser">Nowy użytkownik</router-link>
            <router-link to="/users">Użytkownicy</router-link>
            <router-link to="/charts">Wykresy</router-link>
        </div>
    </div>    
</template>

<script>
    import { mapGetters } from 'vuex'; 

    export default {
        name: 'Hamburger', 

        computed: mapGetters(['isLogged']),

        methods: {
            panel: function () {
                const hamburger = document.querySelector('.hamburger');
                const navigation = document.querySelector('.navigation');

                const handleClick = () => {
                    hamburger.classList.toggle('hamburger-active');
                    navigation.classList.toggle('navigation-active');
                }

                hamburger.addEventListener('click', handleClick());
            },
        },
    }
</script>

<style scoped>
    .hamburger {
        padding: 10px;
        display: inline-block;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        margin: 0;

        transition: transform .3s .1s ease-in-out;

        position: fixed;

        z-index: 10;
    }

    .hamburger-box {
        width: 35px;
        height: 24px;
        display: inline-block;
        position: relative;
        top: 40px;
    }

    .hamburger-inner {
        width: 100%;
        height: 3px;
        background-color: #ffffff;
        position: absolute;

        left: 0;
        top: 50%;
        transform: translateY(-50%);

        transition: background-color .1s .1s ease-in-out;
    }

    .hamburger-inner:before {
        
        width: 100%;
        height: 3px;
        background-color: #ffffff;
        position: absolute;

        content: '';
        left: 0;
        transition: transform .2s .2s ease-in-out;
    }

    .hamburger-inner:before {
        top: -10px;
    }

    .hamburger-inner:after {
        width: 100%;
        height: 3px;
        background-color: #ffffff;
        position: absolute;

        content: '';
        left: 0;
        transition: transform .2s .2s ease-in-out;
    }

    .hamburger-inner:after {
        top: 10px;
    }

    .hamburger-active .hamburger-inner {
        background-color: transparent;
    }

    .hamburger-active .hamburger-inner:before {
        transform: translateY(10px) rotate(45deg);
    }

    .hamburger-active .hamburger-inner:after {
        transform: translateY(-10px) rotate(-45deg);
    }

    .hamburger-active {
        transform: translateX(250px);
    }

    .hamburger .navigation {
        transition: transform .3s .1s ease-in-out;
    }

    .navigation {
        /* height: 500px; do usuniecia aby rozmiar byl automatyczny */
        width: 250px;
        background-color: rgba(20, 20, 20, 1);
        border-top: 1px solid rgba(0, 150, 50, 1);
        border-right: 1px solid rgba(0, 150, 50, 1);
        border-bottom: 1px solid rgba(0, 150, 50, 1);
        position: absolute;
        top: 100px;
        left: 0;
        z-index: 10;

        transform: translateX(-251px);
        transition: transform .3s .1s ease-in-out;

        position: fixed;
    }

    .navigation-active {
        transform: translateX(0px);
    }

    .navigation-list {
        margin-top: 50px;
        list-style: none;
    }

    .navigation-item {
        margin-bottom: 20px;
    }

    .navigation a{
        display: block;
        color: #ffffff;
        padding: 0, 20px;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 50px;
        width: 228px;
        text-align: center;
        margin: 10px;
        border: solid 1px rgba(120, 120, 120, 1);
    }

    .navigation a:hover {
        background-color: rgba(0, 150, 50, 1);
    }

    .navigation a.router-link-exact-active {
        background-color: rgba(0, 150, 50, 1);
    }
</style>