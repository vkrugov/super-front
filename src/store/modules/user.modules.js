import {
    GET_USERS,
    DELETE_USER,
    REGISTRATION_ERROR,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    GET_USERS_SUCCESS,
    GET_GENDERS,
    GET_GENDERS_SUCCESS
} from "../actions/user.actions";

import api from "../../config";
import {sha256} from "js-sha256";

const state = {
    users: [],
    userToAction: 0,
    status: "",
    error: '',
    genders: [],
};

const actions = {
    [GET_USERS]: ({commit}) => {
        return new Promise((resolve, reject) => {
            api.get('/user/get-all')
                .then((response) => {
                    commit(GET_USERS_SUCCESS, response.data)
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    [GET_GENDERS]: ({commit}) => {
        return new Promise((resolve, reject) => {
            api.get('/genders')
                .then((response) => {
                    commit(GET_GENDERS_SUCCESS, response.data)
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    [REGISTRATION_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            let params = Object.assign({}, user);
            params.password = sha256(user.password);
            params.password_confirmation = sha256(user.password_confirmation);
            commit(REGISTRATION_REQUEST);
            api.post('/auth/register', params)
                .then((response) => {
                    if (response.data.success === false) {
                        state.error = response.data.error
                    } else {
                        commit(REGISTRATION_SUCCESS);
                        dispatch(GET_USERS);
                        resolve();
                    }
                })
                .catch(err => {
                    commit(REGISTRATION_ERROR, err);
                    reject(err);
                })
        });
    },
    [DELETE_USER]: ({dispatch}) => {
        return new Promise((resolve, reject) => {
            api.post('/user/delete', {
                id: state.userToAction
            })
                .then(() => {
                    dispatch(GET_USERS);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
};

const mutations = {
    [GET_USERS_SUCCESS]: (state, data) => {
        state.users = data;
        state.status = "success";
    },
    [GET_GENDERS_SUCCESS]: (state, data) => {
        state.genders = data;
    },
    [REGISTRATION_REQUEST]: (state) => {
        state.status = "loading";
    },
    [REGISTRATION_SUCCESS]: (state) => {
        state.status = "success";
    },
    [REGISTRATION_ERROR]: (state) => {
        state.status = "error";
    },
};

export default {
    state,
    actions,
    mutations,
}