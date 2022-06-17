<template>
    <div class='container'>
        <form @submit.prevent="login">
            <div class="row">
                <div class="twelve columns inputs">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" v-model="credential.email">

                    <label for="haslo">Haslo</label>
                    <input type="text" id="haslo" name="haslo" v-model="credential.haslo">
                    
                    <div class="twelve columns action">
                        <input type="submit" value="zaloguj">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {

        name: 'Login',

        data() {
            return {
                credential: {
                    email: '',
                    haslo: '',
                },
            }
        },

        methods: {
            // LOGOWANIE
            login() {
                this.$store.dispatch('login', this.credential);
            },
        },
    }
</script>

<style scoped>
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-size: 20px;
    }

    .row {
        background-color: rgba(40, 40, 40, 1);
        border-radius: 10px;
        border: 1px solid rgba(120, 120, 120, 1);
        
        padding: 50px;
        padding-top: 13px;   
    }

    .row label {
        margin-top: 15px;
}

    .row input {
        background-color: rgba(20, 20, 20, 1);
        border-color: rgba(120, 120, 120, 1);
    }

    .row input:focus {
        border-color: rgba(0, 250, 0, 1);
    }

    .row input[type = "submit"] {
        font-size: 20px;
        background-color:rgba(0, 150, 50, 1);
        color: rgba(255, 255, 255, 1);    

        margin-top: 50px;
    }

    .inputs {
        text-align: center;
    }

    .action 
    {
        display: flex;
        justify-content: center;
    }
</style>

