import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth.modules";
import hero from "./modules/hero.modules";
import user from "./modules/user.modules";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        hero,
        user
    }
})