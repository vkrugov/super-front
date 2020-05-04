<template>
    <div>
        <div class="close-block">
            <router-link to="heroes" class="close-edit">Close</router-link>
        </div>
        <b-form @submit.prevent="submitHero" ref="signInForm" data-vv-scope="signInForm">
            <b-form-group label="Super Nickname" class="text-left">
                <b-form-input
                        v-model="hero.nickname"
                        name="nickname"
                        type="text"
                        class="form-control"
                        :class="$v.hero.nickname.$dirty ? ($v.hero.nickname.$error ? 'is-invalid' : 'is-valid') : ''"
                        @blur="$v.hero.nickname.$touch()"
                        placeholder="Nickname"
                >
                </b-form-input>
                <div class="invalid-feedback" v-if="!$v.hero.nickname.required"> This field s required.</div>
            </b-form-group>
            <b-form-group label="Real Name" class="text-left">
                <b-form-input
                        v-model="hero.real_name"
                        name="real_name"
                        type="text"
                        :class="$v.hero.real_name.$dirty ? ($v.hero.real_name.$error ? 'is-invalid' : 'is-valid') : ''"
                        @blur="$v.hero.real_name.$touch()"
                        placeholder="Real Name"
                >
                </b-form-input>
                <div class="invalid-feedback" v-if="!$v.hero.real_name.required"> This field s required.</div>
            </b-form-group>
            <b-form-group label="Catch Phrase" class="text-left">
                <b-form-textarea
                        v-model="hero.catch_phrase"
                        class="resize-no"
                        name="catch_phrase"
                        type="text"
                        :class="$v.hero.catch_phrase.$dirty ? ($v.hero.catch_phrase.$error ? 'is-invalid' : 'is-valid') : ''"
                        @blur="$v.hero.catch_phrase.$touch()"
                        placeholder="Catch Phrase"
                >
                    <div class="invalid-feedback" v-if="!$v.hero.catch_phrase.required"> This field s required.</div>
                </b-form-textarea>
            </b-form-group>
            <b-form-group label="Original Description" class="text-left">
                <b-form-textarea
                        v-model="hero.origin_description"
                        class="resize-no"
                        name="origin_description"
                        type="text"
                        :class="$v.hero.origin_description.$dirty ? ($v.hero.origin_description.$error ? 'is-invalid' : 'is-valid') : ''"
                        @blur="$v.hero.origin_description.$touch()"
                        placeholder="Description"
                >
                </b-form-textarea>
                <div class="invalid-feedback" v-if="!$v.hero.origin_description.required"> This field s required.</div>
            </b-form-group>
            <b-form-group label="New Avatar" class="text-left">
                <b-form-file
                        @change="setAvatar"
                        name="avatar"
                        type="file"
                >
                </b-form-file>
            </b-form-group>
            <div class="text-left">
                <div class="mr-2" v-for="power in powers" :key="power.name">
                    <input type="checkbox" :id="'power-' + power.id" :value="power.id" v-model="hero.powers">
                    <label class="pl-lg-2" :for="'power-' + power.id">{{ power.name }}</label>
                    <span class="power-desc pl-lg-2">({{ power.description }})</span>
                </div>
            </div>
            <div class="error-block" v-if="error">
                {{error}}
            </div>
            <div class="text-left">
                <b-button class="btn"
                          type="submit"
                          :class="$v.$invalid ? 'btn-primary' : ' btn-success'"
                          :disabled="$v.$invalid"
                >Submit
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import {GET_POWERS, SUBMIT_HERO} from "../../store/actions/hero.actions";
    import {mapState} from "vuex";
    import {required} from 'vuelidate/lib/validators'

    export default {
        computed: mapState({
            powers: (state) => state.hero.powers,
            error: (state) => state.hero.error,
        }),
        name: "EditHero",
        props: {
            hero: {
                type: Object,
                required: true
            }
        },
        validations: {
            hero: {
                nickname: {
                    required,
                },
                real_name: {
                    required,
                },
                catch_phrase: {
                    required,
                },
                origin_description: {
                    required,
                },
            }
        },
        methods: {
            submitHero() {
                var formData = this.setFormData();
                this.$store.dispatch(SUBMIT_HERO, formData).then(() => {
                    this.$router.push("/heroes");
                })
            },
            setFormData() {
                const fd = new FormData();
                fd.append('id', this.hero.id || '')
                fd.append('nickname', this.hero.nickname)
                fd.append('real_name', this.hero.real_name)
                if (this.hero.avatar && this.hero.avatar.name) {
                        fd.append('avatar', this.hero.avatar, this.hero.avatar.fileName)
                }
                fd.append('origin_description', this.hero.origin_description)
                fd.append('catch_phrase', this.hero.catch_phrase)
                fd.append('powers', this.hero.powers)

                return fd;
            },
            setAvatar(event) {
                this.hero.avatar = event.target.files[0];
            },
            getPowers() {
                this.$store.dispatch(GET_POWERS);
            }
        },
        created() {
            this.getPowers()
        }
    }
</script>

<style scoped>

    .close-block {
        text-align: right;
    }

    .power-desc {
        opacity: 0.7;
    }

    .resize-no {
        resize: none;
    }
</style>