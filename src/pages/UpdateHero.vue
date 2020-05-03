<template>
    <div>
        <div>
            <h1>Update Hero {{ hero.nickname }}</h1>
            <edit-hero :hero="hero"></edit-hero>
        </div>
    </div>
</template>

<script>
    import EditHero from "./forms/EditHero";
    import {mapState} from "vuex";

    export default {
        name: "UpdateHero",
        computed: mapState({
            hero: (state) => state.hero.updateHero,
        }),
        components: {
            editHero: EditHero
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>

</style>