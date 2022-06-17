<template>
    <div class='container'>
        
        <div class='contact'>
            <p>MOJA FIRMA</p>
            <p>TEL: 123 456 789</p>
            <p>E-mail: moja.firma@mf.com</p>
            <p>cos tam</p>
            <p>cos tam</p>
        </div>

        <div class='googleMap'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d630.5879360600453!2d19.111822940280604!3d50.78758955339683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b5f3cea53bcb%3A0xb2afb9edd65c5ba7!2sStacja%20Paliw%20ORLEN!5e0!3m2!1spl!2spl!4v1595290163882!5m2!1spl!2spl" 
            width="600" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Contact',
}
</script>

<style scoped>
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .contact {
        margin: 5%;
    }

    .contact p{
        margin: 0;
        color: #ffffff;
        font-size: 40px;        
    }

    .googleMap {
        width: 600px;
        height: 600px;
        border: 2px solid rgba(0, 150, 0, 1);
        margin: 5%;
    }
</style>