<template>
    <div class="container">
        <form @submit.prevent="postData">
            <!-- DANE ZLECENIA -->
            <div class="row">
                <div class="six columns">
                    <label for="nrZlecenia">Nr zlecenia</label>
                    <input class="u-full-width" type="text" id="nrZlecenia" name="nrZlecenia" v-model="zlecenie.nrZlecenia" />

                    <label for="zleceniodawca">Zleceniodawca</label>
                    <input class="u-full-width" type="text" id="zleceniodawca" name="zleceniodawca" v-model="zlecenie.zleceniodawca" />

                    <label for="nazwaZlecenia">Nazwa zlecenia</label>
                    <input class="u-full-width" type="text" id="nazwaZlecenia" name="nazwaZlecenia" v-model="zlecenie.nazwaZlecenia" />

                    <label for="dataZlecenia">Data zlecenia</label>
                    <input class="u-full-width" type="text" id="dataZlecenia" name="dataZlecenia" v-model="zlecenie.dataZlecenia" />
                </div>

                <div class="six columns">
                    <label for="status">Status</label>
                    <select class="u-full-width" name="status" id="status" v-model="zlecenie.status">
                        <option disabled value="">Wybierz status</option>
                        <option v-for="item in status" :key="item._id" :value="item.nazwa"> {{ item.nazwa }} </option>
                    </select>

                    <label for="email">E-mail</label>
                    <input class="u-full-width" type="email" id="email" name="email" v-model="zlecenie.email" />

                    <label for="nrTelefonu">Nr telefonu</label>
                    <input class="u-full-width" type="tel"  id="nrTelefonu" name="nrTelefonu" v-model="zlecenie.nrTelefonu" />

                    <label for="dataRealizacji">Data Realizacji</label>
                    <input class="u-full-width" type="text" id="dataRealizacji" name="dataRealizacji" v-model="zlecenie.dataRealizacji" />
                </div>
            </div>

            <!-- MATERIALY -->
            <div class="row materialy">
                <div class="twelve columns">
                    <div v-for="item in materialy" v-bind:key="item._id">
                        <input  type="checkbox" :id="item.nazwa" :value="item.nazwa" v-model="zlecenie.materialy">
                        <label :for="item.nazwa"> {{ item.nazwa }} </label>
                    </div>
                </div>
            </div>

            <!-- IMPORT PLIKU -->
            <div class="row importPliku">
                <div class="twelve columns">
                    <input type="file" multiple>
                </div>
            </div>

            <!-- WYCENA -->
            <div class="row wycena">
                <div class="four columns">
                    <label for="wycena">Wycena</label>
                    <input class="u-full-width" type="text" id="wycena" name="wycena" v-model="zlecenie.wycena">
                </div>
            </div>

            <!-- WIADOMOSC -->
            <div class="row">
                <div class="twelve columns">
                    <label for="wiadomosc">Wiadomosc</label>
                    <textarea class="u-full-width wiadomosc" name="wiadomosc" id="wiadomosc" cols="30" rows="10" v-model="zlecenie.wiadomosc"></textarea>
                </div>
            </div>

            <!-- AKCJA -->
            <div class="row akcja">
                <div class="four columns">
                    <input class="u-full-width" type="submit" value="stwórz">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "NewOrder",

        data() {
            return {
                zlecenie: {
                    nrZlecenia: null,
                    zleceniodawca: null,
                    nazwaZlecenia: null,
                    dataZlecenia: null,
                    dataRealizacji: null,
                    status: null,
                    email: null,
                    nrTelefonu: null,
                    materialy: [],  
                    wycena: null,      
                    wiadomosc: null,    
                    przyjmujacy: 'q',     
                },
                materialy: {},
                status: [],
            }
        },

        async mounted() {
            // POBRANIE DATY I NUMERU ZLECENIA Z BAZY         
            axios.get('http://localhost:8000/date').then(res => { 
                this.zlecenie.nrZlecenia = res.data.id;
                this.zlecenie.dataZlecenia = res.data.data;
            });

            // POBRANIE STATUSOW Z BAZY
            axios.get('http://localhost:8000/action').then(res => {
                this.status = res.data;
            });

            // POBRANIE MATERIALOW Z BAZY
            axios.get('http://localhost:8000/material').then(res => {
                this.materialy = res.data;
            });

            console.log("order:", this.zlecenie)
        },

        methods: {
            // POBRANIE DATY I NOWEGO NUMERU ZLECENIA Z BAZY 
            getDateNr: function() {
                axios.get('http://localhost:8000/date').then(res => { 
                    this.zlecenie.nrZlecenia = res.data.id;
                    this.zlecenie.dataZlecenia = res.data.data;
                });
            },

            // newForm() {
            //     axios.get('http://localhost:8000/date').then(res => {
            //         this.zlecenie.nrZlecenia = res.data.id;
            //         this.zlecenie.dataZlecenia = res.data.data;
            //         this.zlecenie = {
            //             nrZlecenia: null,
            //             zleceniodawca: null,
            //             nazwaZlecenia: null,
            //             dataZlecenia: null,
            //             dataRealizacji: null,
            //             status: '',
            //             email: null,
            //             nrTelefonu: null,
            //             materialy: [],  
            //             wycena: null,      
            //             wiadomosc: null,  
            //         };
            //     });
            //     console.log("powiodło się")
            // },

            postData: function() {
                // USTAWIENIE CHECKBOXOW JAKO STRING
                this.zlecenie.materialy = this.zlecenie.materialy.toString();

                // PRZESLANIE FORUMALARZA DO BAZY
                axios.post('http://localhost:8000/order/add', this.zlecenie)
                .then(() => {this.zlecenie = {
                    nrZlecenia: null,
                    zleceniodawca: null,
                    nazwaZlecenia: null,
                    dataZlecenia: null,
                    dataRealizacji: null,
                    status: '',
                    email: null,
                    nrTelefonu: null,
                    materialy: [],  
                    wycena: null,      
                    wiadomosc: null,    
                }});

                // axios.post('http://localhost:8000/order/add', this.zlecenie)
                //     .then(() => this.newForm());
                
                // this.$toast.success("Dodano zlecenie", {
                //     position: "top-right",
                //     timeout: 4990,
                //     closeOnClick: true,
                //     pauseOnFocusLoss: false,
                //     pauseOnHover: true,
                //     draggable: true,
                //     draggablePercent: 1,
                //     showCloseButtonOnHover: false,
                //     hideProgressBar: true,
                //     closeButton: "button",
                //     icon: true,
                //     rtl: false
                // });

                // funkcja
                //this.getDateNr();
            }
        },
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
        padding-top: 13px;

        border-radius: 10px;
        border: 1px solid rgba(120, 120, 120, 1);
    }

    .container input, select {
        background-color: rgba(20, 20, 20, 1);
        border-color: rgba(120, 120, 120, 1);
    }

    .container input:focus {
        border-color: rgba(0, 250, 0, 1);
    }

    .materialy {
        padding-top: 50px;
    }

    .container input[type = "checkbox"] + label {
        cursor: pointer;
    }

    .container input[type = "checkbox"] {
        display: none;
    }

    .container input[type = "checkbox"] + label:before {
        content:"\2714";
        background-color:rgba(20, 20, 20, 1);
        border: 1px solid rgba(120, 120, 120, 1);
        border-radius: 10px;
        display: inline-block;
        width: 25px;
        height: 25px;
        padding-left: 6px;
        padding-bottom: 6px;
        margin-right: 10px;
        vertical-align: middle;
        color: transparent;
        transition: .2s;
    }

    .container input[type = "checkbox"] + label:active:before {
        transform: scale(0);
    }

    .container input[type = "checkbox"]:checked + label:before {
        background-color: rgba(0, 150, 50, 1);
        color:rgba(255, 255, 255, 1);
    }

    .container label {
        margin-top: 15px;
    }

    .container select:focus {
            border-color: rgba(0, 250, 0, 1);
        }

    .importPliku {
        padding-top: 50px;
        text-align: center;
    }

    .wycena {
        display: flex;
        justify-content: center;
    }

    .wiadomosc {
        height: 400px;
        background-color:rgba(20, 20, 20, 1);
        border: 1px solid rgba(120, 120, 120, 1);
    }

    .container textarea:focus {
            border-color: rgba(0, 250, 0, 1);
        }

    .akcja {
        padding-top: 50px;
        display: flex;
        justify-content: center;
    }

    .akcja input {
        font-size: 20px;
        background-color:rgba(0, 150, 50, 1);
        color: rgba(255, 255, 255, 1);
        text-align: center
    }
</style>