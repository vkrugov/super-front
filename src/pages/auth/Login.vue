<template>
    <div>
        <b-form @submit.prevent="signIn">
            <b-form-group label="Email" class="text-left">
                <b-form-input
                        v-model="email"
                        name="email"
                        type="text"
                        placeholder="Email"
                >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Password" class="text-left">
                <b-form-input
                        v-model="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                >
                </b-form-input>
            </b-form-group>
            <b-button type="submit" class="bg-success">Submit</b-button>
        </b-form>
        <div v-if="error" class="error-block">
            {{ this.error }}
        </div>
    </div>
</template>

<script>
    import {AUTH_REQUEST} from "../../store/actions/auth.actions";

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                error: ""
            };
        },
        methods: {
            signIn() {
                this.$store.dispatch(AUTH_REQUEST, {email: this.email, password: this.password})
                    .then(() => {
                        this.$router.push("/heroes");
                    }).catch((error) => {
                    if (error.response.status === 401) {
                        this.error = 'Login or Password are invalid'
                    }
                });
            }

        },
    }
</script>

<style scoped>

</style>