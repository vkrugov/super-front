<template>
    <div>
        <h1>SuperHeroes and them powers!</h1>
        <img alt="Hero logo" class="logo" src="../assets/heroes.jpg">
        <h3>
            Login as admin to create new heroes or edit current:
        </h3>
        <h5>
            email: admin@test.co
        </h5>
        <h5>
            password: 111111
        </h5>
    </div>
</template>

<script>

    export default {
        name: "Home",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
    .logo {
        width: 50%;
        height: auto;
        padding-top: 20px;
        padding-bottom: 10px;
    }
</style>