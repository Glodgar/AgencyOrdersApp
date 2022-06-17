<template>
    <div>
        <canvas :width="width" :height="height" :id="id"></canvas>
    </div>    
</template>

<script>
    import Chart from 'chart.js';

    export default {
        name: 'chart',

        props: [
            "id",
            "width",
            "height",
            "type",
            "title",
            "labels",
            "data",
            "fill",
            "backgroundColor",
            "borderColor",
            "borderWidth",
        ],

        mounted() {
            var ctx = document.getElementById(this.id).getContext("2d");
            new Chart(ctx, {
            type: this.type ? this.type : "bar",
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.title,
                        data: this.data,
                        fill: this.fill,
                        backgroundColor: this.backgroundColor,
                        borderColor: this.borderColor,
                        borderWidth: this.borderWidth ? this.borderWidth : 1,
                    }
                ],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                },
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }
            }
            });
        },
    }

</script>

<style scoped>

</style>