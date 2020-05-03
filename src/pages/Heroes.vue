<template>
    <div>
        <div id="heroes">
            <div v-if="user.id != null" class="new-hero-block" @click="focusChild">
                <router-link class="new-hero-link" to="new-hero">Add New Super Hero</router-link>
            </div>
            <div v-if="heroesSuccess">
                <div id="hero-list">
                    <div class="hero-nav">
                        <div>
                            <button class="hero-pagination"
                                    :class="from === 0 ? 'hero-pagination-disable' : 'hero-pagination-active'"
                                    :disabled="from === 0"
                                    @click="getPrevHeroes">Previous
                            </button>
                            <button class="hero-pagination"
                                    :class="isThereMore === 0 ? 'hero-pagination-disable' : 'hero-pagination-active'"
                                    :disabled="isThereMore === 0"
                                    @click="getNextHeroes">Next
                            </button>
                        </div>
                    </div>
                    <div class="row hero-items">
                        <div class=" hero-item" v-for="hero in heroes" :key="hero.nickname">
                            <div class="hero-actions">
                                <div v-if="user.id != null">


                                    <button class="btn-success" @click="setUpdateUser($event)" :data-id="hero.id">
                                        Update
                                    </button>
                                    <button class="btn-danger" @click="deleteHero($event)" :data-id="hero.id">
                                        Delete
                                    </button>
                                </div>
                                <button class="btn-info" @click="showGallery($event)" :data-id="hero.id">
                                    Show Gallery
                                </button>
                            </div>
                            <div class="hero-avatar">
                                <img width="200" height="250" v-if="hero.avatar" :src="hero.avatar" alt="Hero Avatar">
                                <img width="200" height="250" v-else src="../assets/defaultHero.jpeg" alt="Hero Avatar">
                            </div>
                            <div class="hero-desc">
                                <div>
                                    <div class="font-weight-bold">Nickname:</div>
                                    {{ hero.nickname }}
                                </div>
                                <div>
                                    <div class="font-weight-bold">Real Name:</div>
                                    {{ hero.real_name }}
                                </div>
                                <div>
                                    <div class="font-weight-bold">Catch Phrase:</div>
                                    {{ hero.catch_phrase }}
                                </div>
                                <div>
                                    <div class="font-weight-bold">Last Updater:</div>
                                    {{ hero.last_updater }}
                                </div>
                                <div>
                                    <div class="font-weight-bold">Updated:</div>
                                    {{ hero.updated_at }}
                                </div>
                                <div>
                                    <div class="font-weight-bold">Created:</div>
                                    {{ hero.created_at }}
                                </div>
                                <div>
                                    <div class="font-weight-bold">Super Powers:</div>
                                    <ul v-if="hero.powers">
                                        <li v-for="power in hero.powers" :key="power.name">
                                            <span class="font-weight-bold">{{ power.name }}</span>
                                            <div>
                                                <span>({{ power.description }})</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="child-view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {
        DELETE_HERO, GET_GALLERY,
        GET_HERO_TO_UPDATE,
        GET_HEROES,
        GET_NEXT_HEROES,
        GET_PREV_HEROES,
    } from "../store/actions/hero.actions";

    export default {
        name: "Products",
        data() {
            return {}
        },
        computed: mapState({
            heroes: (state) => state.hero.heroes,
            from: (state) => state.hero.from,
            isThereMore: (state) => state.hero.isThereMore,
            heroesSuccess: (state) => state.hero.status === 'success',
            user: (state) => state.auth.user,
        }),
        methods: {
            getHeroes() {
                this.$store.dispatch(GET_HEROES);
            },
            getNextHeroes() {
                this.$store.dispatch(GET_NEXT_HEROES);
            },
            getPrevHeroes() {
                this.$store.dispatch(GET_PREV_HEROES);
            },
            setUpdateUser(event) {
                this.$store.state.hero.heroToAction = event.target.dataset.id;
                this.$store.dispatch(GET_HERO_TO_UPDATE)
                    .then(() => {
                        this.$router.push("/update-hero");
                        this.focusChild();
                    })
            },
            deleteHero(event) {
                this.$store.state.hero.heroToAction = event.target.dataset.id;
                this.$store.dispatch(DELETE_HERO);
            },
            focusChild() {
                var child = document.getElementById('child-view');
                child.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            },
            showGallery(event) {
                this.$store.state.hero.heroToAction = event.target.dataset.id;
                this.$store.dispatch(GET_GALLERY).then(() => {
                    this.$router.push("/gallery");
                    this.focusChild();
                });
            }
        },
        created() {
            this.getHeroes()
        }
    }
</script>

<style scoped>
    .hero-items {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        text-align: left;
    }

    .hero-nav {
        padding-top: 20px;
    }

    .hero-pagination {
        margin: 10px;
        min-width: 100px;
        padding: 20px;
        color: #eff7fd;
    }

    .hero-item {
        font-size: 13px;
    }

    .new-hero-link {
        padding: 20px;
        text-decoration: none;
        background-color: #114f8b;
        color: #eff7fd;
        border-radius: 5px;
    }

    .hero-pagination-active {
        background-color: #2c3e50;
        border-radius: 5px;
        border: none;
    }

    .hero-pagination-disable {
        background-color: #5d7690;
        border-radius: 5px;
        border: none;
    }

    .new-hero-block {
        text-align: left;
        margin-top: 20px;
    }

    .hero-actions button {
        border-radius: 5px;
        margin: 5px
    }
</style>