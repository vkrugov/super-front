<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <router-link class="nav-link site-logo" to="/"> SuperHeroTeam !</router-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <router-link class="nav-link" to="/"> Home</router-link>
                    <router-link class="nav-link" to="/heroes"> All Super Heroes</router-link>
                    <router-link v-show="user.id != null" class="nav-link" to="/users"> Users</router-link>
                </b-navbar-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="user.id != null" :text="user.name" right>
                        <b-dropdown-item @click="logout">
                            <span> Logout </span>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <div v-else>
                        <router-link class="nav-link" to="/login"> Login as Admin</router-link>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {AUTH_LOGOUT} from "../store/actions/auth.actions";

    export default {
        name: "Navbar",
        computed: mapState({
            user: (state) => state.auth.user,
        }),
        methods: {
            logout() {
                this.$store.dispatch(AUTH_LOGOUT)
                    .then(() => {
                        this.$router.push("/");
                    });
            }
        },
    }
</script>

<style scoped>
    .site-logo {
        color: aliceblue;
    }
</style>