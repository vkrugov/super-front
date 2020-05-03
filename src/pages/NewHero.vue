<template>
    <div>
        <h1>Create New Super Hero</h1>
        <edit-hero :hero="hero"></edit-hero>
    </div>
</template>

<script>
    import EditHero from './forms/EditHero'

    export default {
        name: "NewHero",
        components: {
            editHero: EditHero
        },
        data() {
            return {
                hero: {
                    avatar: '',
                    nickname: '',
                    real_name: '',
                    origin_description: '',
                    catch_phrase: '',
                    powers: []
                }
            }
        }
    }
</script>

<style scoped>

</style>