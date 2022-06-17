<template>
    <div class="container">
        
        <div class="row">
            <div class="twelve columns">
                <ul>
                    <li v-for="item in results" v-bind:key="item._id" v-on:click="getOrder(item)">
                        <p> nrZlecenia: {{ item.nrZlecenia }} </p>
                        <p> Zleceniodawca: {{ item.zleceniodawca }} </p>
                        <p> dataZlecenia: {{ item.dataZlecenia }} </p>
                        <p> dataRealizacji: {{ item.dataRealizacji }} </p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import router from '../router';

    export default {
        name: 'Orders',

        data() {
            return {
                results: [],
            }
        },

        async mounted() {
            // POBRANIE ZLECEN Z BAZY
            const items = await axios.get('http://localhost:8000/order');
            this.results = items.data;
        },
        
        methods: {
            // METODA PRZENOSZACA DO 'order'
            getOrder: function(order) {
                router.push({path:`order/${order._id}`})
            }
        }
    };
</script>

<style scoped>
    .container {
        margin-top: 50px;
        font-size: 20px;
    }

    .row {
        background-color: rgba(40, 40, 40, 1);
        margin-bottom: 50px;

        padding: 50px;
        padding-bottom: 0px;
        
        border-radius: 10px;
        border: 1px solid rgba(120, 120, 120, 1);
    }

    .container ul {
        list-style: none;
    }

    .container li {
        background-color: rgba(20, 20, 20, 1);
        border: 1px solid rgba(120, 120, 120, 1);
        border-radius: 10px;
        padding-left: 50px;
        list-style: none;
        padding: 0;
        cursor: pointer;
        padding: 50px;
        margin-bottom: 50px;
    }

    p {
        margin: 0px;
    }

    .container li:hover {
        border-color: rgba(0, 150, 50, 1);
    }
</style>