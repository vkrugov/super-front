<template>
    <div>
        <h1>Create New User</h1>
        <div class="close-block text-right">
            <router-link to="users" class="close-edit">Close</router-link>
        </div>
        <b-form @submit.prevent="signUp" ref="signInForm" data-vv-scope="signInForm">
            <profile-form :user="user"></profile-form>
            <b-form-group label="Password" class="text-left">
                <b-form-input
                        v-model="user.password"
                        :class="$v.user.password.$dirty ? ($v.user.password.$error ? 'is-invalid' : 'is-valid') : ''"
                        @blur="$v.user.password.$touch()"
                        name="password"
                        type="password"
                        placeholder="Password"
                >
                </b-form-input>
                <div class="invalid-feedback" v-if="!$v.user.password.minLength || !$v.user.password.required">
                    Password must be more than {{ $v.user.password.$params.minLength.min }}. Now it is
                    {{user.password.length}}
                </div>
            </b-form-group>
            <b-form-group label="Confirm Password" class="text-left">
                <b-form-input
                        v-model="user.password_confirmation"
                        name="password_confirmation"
                        type="password"
                        :class="$v.user.password_confirmation.$dirty ? ($v.user.password_confirmation.$error ? 'is-invalid' : 'is-valid') : ''"
                        @blur="$v.user.password_confirmation.$touch()"
                        placeholder="Confirm Password"
                >
                </b-form-input>
                <div class="invalid-feedback" v-if="!$v.user.password_confirmation.sameAs">
                    Passwords must be same
                </div>
            </b-form-group>
            <div class="error-block" v-if="error">
                {{error}}
            </div>
            <b-button class="btn"
                      type="submit"
                      :class="$v.$invalid ? 'btn-primary' : ' btn-success'"
                      :disabled="$v.$invalid"
            >Submit
            </b-button>
        </b-form>
    </div>
</template>

<script>
    import ProfileForm from "../forms/ProfileForm";
    import {REGISTRATION_REQUEST} from "../../store/actions/user.actions";
    import {required, minLength, sameAs} from 'vuelidate/lib/validators'
    import {mapState} from "vuex";

    export default {
        computed: mapState({
            error: (state) => state.user.error,
        }),
        name: "Register",
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    gender: '',
                    password: '',
                    password_confirmation: '',
                }
            }
        },
        components: {
            profileForm: ProfileForm
        },
        methods: {
            signUp() {
                this.$store.dispatch(REGISTRATION_REQUEST, this.user)
                    .then(() => {
                        this.$router.push("/users");
                    });
            }
        },
        validations: {
            user: {
                name: {
                    required
                },
                password: {
                    minLength: minLength(6),
                    required
                },
                password_confirmation: {
                    sameAs: sameAs((vue) => {
                        return vue.password
                    }),
                },
            }
        }
    }
</script>

<style scoped>

</style>