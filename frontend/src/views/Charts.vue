<template>
    <div class="container">
        <input type="text" v-model="dateStart">
        <input type="text" v-model="dateEnd">
        {{ dateStart }}
        {{ dateEnd }}


        <chart name="xd" v-if='!this.loading'
            class="chart"
            width="1000"
            height="300"
            
            id="chart2"
            type="bar"
            
            title="Ilość zmaówien utworzonych przez dane osoby"
            :labels="osoby"
            :data="wartosci"
            :background-color="['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 150)']"
            :border-color="'rgba(0, 0, 0, 1)'"
        ></chart>

    </div>
</template>

<script>
    import chart from '../components/Chart';
    import axios from 'axios';

    export default {
        name: 'xd',

        components: {
            chart
        },

        data() {
            return {
                results: [],
                osoby: [],
                wartosci: [],
                loading: true,
                // dateStart: '8/8/2020',
                // dateEnd: '30/12/2020',
                dateStart: '2020-04-11T22:00:00.000+00:00Z',
                dateEnd: '2020-12-30T22:00:00.000+00:00Z',
            }
        },

        async mounted() {
            // POBRANIE ZLECEN Z BAZY
            const items = await axios.get('http://localhost:8000/order');
            this.results = items.data;

            console.log(this.results);

            // const array = this.results.map(res => res.przyjmujacy);
            const array = this.results.filter(n => this.dateStart < n < this.dateEnd).map(res => res.przyjmujacy);
                // const uniqueArray = [...new Set(this.results.[])];

                var counts = [];
                array.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

                const xd = Object.keys(counts);
                const xdd = Object.values(counts);

                this.osoby = xd;
                this.wartosci = xdd;

                const data = new Date.parse(this.results.dataRealizacji)
                this.results.dataRealizacji = data;
                console.log(this.results.dataRealizacji);

                this.loading = false;
        },
    }
</script>

<style scoped>
    .container {
        padding: 50px;
        color: green;
    }
</style>