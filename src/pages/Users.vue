<template>
    <div>
        <h1>Admin Users</h1>
        <div class="text-left">
            <button @click="registerUser" class="btn-success">
                Register New User
            </button>
        </div>
        <div id="child-view">
            <router-view></router-view>
        </div>
        <div v-if="users.length > 0" class="text-left mt-4">
            <div v-for="user in users" :key="user.id">
                <div class="font-weight-bold ">
                    {{ user.name }}

                </div>
                <div class="row">
                    <div class="col-md-2">
                        {{ user.email }}
                    </div>
                    <div class="col-md-2">
                        <button :data-id="user.id" @click="deleteUser" class="btn-danger mb-2"> Remove User</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {GET_USERS, DELETE_USER} from "../store/actions/user.actions";
    import {mapState} from "vuex";

    export default {
        name: "Users",
        computed: mapState({
            users: (state) => state.user.users,
        }),
        methods: {
            getUsers() {
                this.$store.dispatch(GET_USERS)
            },
            registerUser() {
                this.$router.push("/register");
            },
            deleteUser(event) {
                this.$store.state.user.userToAction = event.target.dataset.id;
                this.$store.dispatch(DELETE_USER)
            }
        },
        created() {
            this.getUsers()
        }
    }
</script>

<style scoped>

</style>