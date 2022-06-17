<template>
    <div class="container">
        <form @submit.prevent="postData">
            <!-- DANE -->
            <div class="row">
                <div class="six columns">
                    <label for="imie">Imie</label>
                    <input class="u-full-width" type="text" id="imie" name="imie" v-model="user.imie" />

                    <label for="email">Email</label>
                    <input class="u-full-width" type="text" id="email" name="email" v-model="user.email" />

                    <label for="haslo">Haslo</label>
                    <input class="u-full-width" type="text" id="haslo" name="haslo" v-model="user.haslo" />

                    <label for="dataModyfikacji">Data Modyfikacji</label>
                    <input class="u-full-width" type="text" id="dataModyfikacji" name="dataModyfikacji" v-model="user.dataModyfikacji" />
                </div>

                <div class="six columns">
                    <label for="nazwisko">Nazwisko</label>
                    <input class="u-full-width" type="text" id="nazwisko" name="nazwisko" v-model="user.nazwisko" />

                    <label for="nrTelefonu">Nr telefonu</label>
                    <input class="u-full-width" type="text" id="nrTelefonu" name="nrTelefonu" v-model="user.nrTelefonu" />

                    <label for="dataUtworzenia">Data utworzenia</label>
                    <input class="u-full-width" type="text" id="dataUtworzenia" name="dataUtworzenia" v-model="user.dataUtworzenia" />
                </div>
            </div>

            <!-- ROLE -->
            <div class="row role">
                <div class="six columns">
                    <select class="u-full-width" name="role" id="role" v-model="user.rola">
                        <option disabled value="">Wybierz role użytkownika</option>
                        <option v-for="item in role" v-bind:key="item._id" :value="item.rola"> {{ item.rola }} </option>
                    </select>
     
                </div>
            </div>

            <!-- AKCJA -->
            <div class="row action">
                <div class="four columns">
                    <input class="u-full-width" type="submit" value="dodaj" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "NewUser",
        
        data() {
            return {
                user: {
                    imie: null,
                    nazwisko: null,
                    email: null,
                    haslo: null,
                    nrTelefonu: null,
                    rola: '',
                    dataUtworzenia: null,
                    dataModyfikacji: null
                },
                role: [],
            }
        },

        async mounted() {
            // POBRANIE ROLI Z BAZY
            const role = await axios.get('http://localhost:8000/role');
            this.role = role.data;

            // USTAWIENIE DATY MODYFIKACJI
            const data = new Date().toISOString().split('T')[0].replaceAll('-', '/');
            this.user.dataUtworzenia = data;
        },

        // PRZESLANIE FORMULARZA DO BAZY
        methods: {
            postData: function() {
                axios.post('http://localhost:8000/user/add', this.user)
                    .then(() => {this.user = {
                        imie: null,
                        nazwisko: null,
                        email: null,
                        nrTelefonu: null,
                        rola: '',
                    }});

                this.$toast.success("Dodano użytkownika", {
                    position: "top-right",
                    timeout: 4990,
                    closeOnClick: true,
                    pauseOnFocusLoss: false,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 1,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            },
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

    .container input {
        background-color: rgba(20, 20, 20, 1);
        border-color: rgba(120, 120, 120, 1);
    }

    .container input:focus {
        border-color: rgba(0, 250, 0, 1);
    }

    .container label {
        margin-top: 15px;
    }

    .role {
        padding: 50px;
        display:flex;
        justify-content: center;
    }

    .container select {
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