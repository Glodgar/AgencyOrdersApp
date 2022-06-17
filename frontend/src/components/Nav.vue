<template>
  <div class="navigationBar">
    <div class="fixedBar">
      <div class="nav">
        
        <router-link to="/">Home</router-link>
        <router-link to="/about">O nas</router-link>
        <router-link to="/contact">Kontakt</router-link>
        <router-link v-if="!isLogged"  to="/login">Zaloguj</router-link>

        <div class="logout" v-if="isLogged" v-on:click="logout">Wyloguj</div>

      </div>
    </div>
    <div class="staticBar"></div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'; 

    export default {
        name: "Nav",

        computed: mapGetters(['isLogged']),

        methods: {
            logout() {
                this.$store.dispatch('logout');
            },
        },

    };
</script>

<style scoped>
.fixedBar {
  height: 50px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed; /* przyklejenie do scrolla */
  z-index: 10;
  

  color: #ffffff;
  font-weight: bold;
  line-height: 50px;


  border-bottom: 1px solid rgba(0, 150, 50, 1);
}

.nav {
  height: 50px;

  display: flex;

  right: 0;

  /* przyklejenie do scrolla */
  position: fixed;
}

.logout {
    display: block;
    color: #ffffff;
    padding: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 50px;
    width: 100px;
    text-align: center;
    border: none;
}

.logout:hover {
    background-color: rgba(0, 150, 50, 1);
}

.nav a {
    display: block;
    color: #ffffff;
    padding: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 50px;
    width: 100px;
    text-align: center;
}

.nav a:hover {
    background-color: rgba(0, 150, 50, 1);
}

.nav a.router-link-exact-active {
  background-color: rgba(0, 150, 50, 1);
}

.logo {
  position: fixed;
  color: #ffffff;
  line-height: 50px;
  font-size: 30px;
  padding: 0 10px;
}

.staticBar {
  width: 100%;
  height: 50px;
  background-color: #000000;

  /* nie przydatne (dla testow) */
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  line-height: 50px;
  font-size: 50px;
}
</style>