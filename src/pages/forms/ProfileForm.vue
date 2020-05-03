<template>
    <div>
        <b-form-group label="First Name" class="text-left">
            <b-form-input
                    v-model="user.name"
                    name="first_name"
                    type="text"
                    :class="$v.user.name.$dirty ? ($v.user.name.$error ? 'is-invalid' : 'is-valid') : ''"
                    @blur="$v.user.name.$touch()"
                    placeholder="First Name"
            >
            </b-form-input>
            <div class="invalid-feedback" v-if="!$v.user.name.required"> This field s required.</div>
        </b-form-group>
        <b-form-group label="Email Address" class="text-left">
            <b-form-input
                    v-model="user.email"
                    name="email"
                    type="text"
                    :class="$v.user.email.$dirty ? ($v.user.email.$error ? 'is-invalid' : 'is-valid') : ''"
                    @blur="$v.user.email.$touch()"
                    placeholder="example@domen.com"
            >
            </b-form-input>
            <div class="invalid-feedback" v-if="!$v.user.email.required"> This field s required.</div>
            <div class="invalid-feedback" v-if="!$v.user.email.email"> Please provide a valid email.</div>
        </b-form-group>
        <b-form-group label="Gender" class="text-left">
            <b-form-select
                    v-model="user.gender"
                    :options="genders"
                    name="gender"
                    prompt="Gender"
            >
            </b-form-select>
        </b-form-group>
    </div>
</template>

<script>
    import {required, email} from "vuelidate/lib/validators";
    import {mapState} from "vuex";
    import {GET_GENDERS} from "../../store/actions/user.actions";

    export default {
        computed: mapState({
            genders: (state) => state.user.genders,
        }),
        name: "ProfileForm",
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        validations: {
            user: {
                name: {
                    required,
                },
                email: {
                    required,
                    email
                },
            }
        },
        created() {
            this.$store.dispatch(GET_GENDERS);
        }
    }
</script>

<style scoped>

</style>