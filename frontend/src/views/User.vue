<template>
    <div class="container">
        <form @submit.prevent="updateData">
            <!-- DANE -->
            <div class="row">
                <div class="six columns">
                    <label for="imie">Imie</label>
                    <input class="u-full-width" id="imie" type="text"  v-model="results.imie">

                    <label for="email">E-mail</label>
                    <input class="u-full-width" id="email" type="text" v-model="results.email">

                    <label for="utworzono">Utworzono</label>
                    <input class="u-full-width" id="utworzono" type="text" v-model="results.dataUtworzenia">
                </div>

                <div class="six columns">
                    <label for="nazwisko">Nazwisko</label>
                    <input class="u-full-width" id="nazwisko" type="text" v-model="results.nazwisko">
                    
                    <label for="nrTelefonu">nrTelefonu</label>
                    <input class="u-full-width" id="nrTelefonu" type="text" v-model="results.nrTelefonu">
                    
                    <label for="zmodyfikowano">Zmodyfikowano</label>
                    <input class="u-full-width" id="zmodyfikowano" type="text" v-model="results.dataModyfikacji">
                </div>
            </div>

            <!-- ROLE -->
            <div class="row role">
                <div class="six columns">
                    <select class="u-full-width" name="role" id="role" v-model="results.rola">
                        <option :value="results.rola"> {{ results.rola }} </option>
                        <option v-for="item in role" v-bind:key="item._id" :value="item.rola"> {{ item.rola }} </option>
                    </select>
                </div>
            </div>

            <div class="row action">
                <div class="four columns">
                    <input class="u-full-width" type="submit" value="aktualizuj">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    
    export default {
        name: "User",
        props: ["id"],

        data() {
            return {
                results: {},
                role: [],
            }
        },

        mounted: async function() {
            // POBRANIE DANYCH UZYTKOWNIKA Z BAZY
            const user = await axios.get(`http://localhost:8000/user/${this.id}`);
            this.results = user.data;

            // POBRANIE ROLI Z BAZY
            const role = await axios.get('http://localhost:8000/role');
            this.role = role.data;

            // USTAWIENIE DATY MODYFIKACJI
            const data = new Date().toISOString().split('T')[0].replaceAll('-', '/');
            this.results.dataModyfikacji = data;
        },

        methods: {
            //PRZESLANIE FORMULARZA DO BAZY
            updateData: function() {
                axios.put(`http://localhost:8000/user/${this.id}`, this.results);
            },
        },
    }
</script>

<style scoped>
    .container {
        margin-top: 50px;
        font-size: 20px;
    }

    .row {
        background-color: rgba(40, 40, 40, 1);
        margin-bottom: 13px;

        padding: 50px;
        padding-top: 13px;
        
        border-radius: 10px;
        border: 1px solid rgba(120, 120, 120, 1);
    }

    .container input {
        background-color: rgba(20, 20, 20, 1);
        border-color: rgba(120, 120, 120, 1);
    }

    .container input:focus {
        border-color: rgba(0, 250, 0, 1);
    }

    .role {
        padding: 50px;
        display: flex;
        justify-content: center;
    }

    .container select{
        background-color: rgba(20, 20, 20, 1);
        border-color: rgba(120, 120, 120, 1);
    }

    .action {
        padding: 50px;
        display: flex;
        justify-content: center;
    }

    .action input {
        font-size: 20px;
        background-color: rgba(0, 150, 50, 1);
        color: rgba(255, 255, 255, 1);
        text-align: center;
    }
</style>