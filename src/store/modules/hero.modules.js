import api from "../../config";

import {
    GET_HERO_TO_UPDATE,
    GET_HEROES,
    GET_HEROES_ERROR,
    GET_HEROES_SUCCESS,
    GET_NEXT_HEROES,
    GET_POWERS,
    GET_POWERS_SUCCESS,
    GET_PREV_HEROES,
    SUBMIT_HERO,
    GET_HERO_TO_UPDATE_SUCCESS,
    DELETE_HERO,
    UPLOAD_IMAGE, GET_GALLERY, GET_GALLERY_SUCCESS, DELETE_IMAGE
} from "../actions/hero.actions";


const state = {
    heroes: [],
    powers: [],
    status: 'loading',
    from: 0,
    isThereMore: 0,
    heroToAction: 0,
    updateHero: {},
    gallery: [],
    imageToDel: '',
    error: ''
};

const actions = {
    [GET_NEXT_HEROES]: ({dispatch}) => {
        return new Promise(() => {
            state.from += 5;
            dispatch(GET_HEROES);
        });
    },
    [GET_PREV_HEROES]: ({dispatch}) => {
        return new Promise(() => {
            state.from -= 5;
            dispatch(GET_HEROES);
        });
    },
    [GET_HEROES]: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit(GET_HEROES);
            api.get('/heroes?from=' + state.from)
                .then(({data}) => {
                    commit(GET_HEROES_SUCCESS, data);
                    resolve();
                })
                .catch(err => {
                    commit(GET_HEROES_ERROR);
                    reject(err);
                })
        });
    },
    [GET_HERO_TO_UPDATE]: ({commit}) => {
        return new Promise((resolve, reject) => {
            api.get('/update-hero?id=' + state.heroToAction)
                .then((response) => {
                    commit(GET_HERO_TO_UPDATE_SUCCESS, response.data)
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    [GET_POWERS]: ({commit}) => {
        return new Promise((resolve, reject) => {
            api.get('/powers')
                .then(({data}) => {
                    commit(GET_POWERS_SUCCESS, data);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    [DELETE_HERO]: ({dispatch}) => {
        return new Promise((resolve, reject) => {
            api.post('/hero/delete', {
                id: state.heroToAction
            })
                .then(() => {
                    dispatch(GET_HEROES);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    [SUBMIT_HERO]: ({dispatch}, formData) => {
        return new Promise((resolve, reject) => {
            api.post('/hero/edit', formData)
                .then((response) => {
                    if (response.data.success === false) {
                        state.error = response.data.error
                    } else {
                        dispatch(GET_HEROES);
                        resolve();
                    }
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    [UPLOAD_IMAGE]: ({dispatch}, formData) => {
        return new Promise((resolve, reject) => {
            api.post('/hero/upload-img', formData)
                .then((response) => {
                    if (response.data.success === false) {
                        state.error = response.data.error
                    } else {
                        dispatch(GET_GALLERY);
                        resolve();
                    }
                })
                .catch(err => {
                    dispatch(GET_GALLERY);
                    reject(err);
                })
        });
    },
    [GET_GALLERY]: ({commit}) => {
        return new Promise((resolve, reject) => {
            api.get('/hero/get-gallery?id=' + state.heroToAction)
                .then((response) => {
                    commit(GET_GALLERY_SUCCESS, response.data);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    [DELETE_IMAGE]: ({dispatch}) => {
        return new Promise((resolve, reject) => {
            api.post('/hero/delete-img', {
                img: state.imageToDel
            })
                .then(() => {
                    dispatch(GET_GALLERY);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
};

const mutations = {
    [GET_HEROES]: (state) => {
        state.status = 'loading';
    },
    [GET_HEROES_SUCCESS]: (state, data) => {
        state.status = 'success';
        state.heroes = data.heroes
        state.isThereMore = data.isThereMore
    },
    [GET_HEROES_ERROR]: (state) => {
        state.status = '';
    },
    [GET_POWERS_SUCCESS]: (state, data) => {
        state.powers = data;
    },
    [GET_HERO_TO_UPDATE_SUCCESS]: (state, data) => {
        state.updateHero = data;
    },
    [GET_GALLERY_SUCCESS]: (state, data) => {
        state.gallery = data;
    }
};

export default {
    state,
    actions,
    mutations
}