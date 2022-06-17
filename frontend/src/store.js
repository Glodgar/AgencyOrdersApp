import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex);

const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

const state = {
    logged: localStorage.getItem('accessToken'),
}

const getters = {
    isLogged: state => state.logged
};

const actions = {
    login({commit}, credential) {
        axios.post('http://localhost:8000/login', credential)
            .then(res => { 
                localStorage.setItem('accessToken', res.data.accessToken); 
                localStorage.setItem('refreshToken', res.data.refreshToken);

                commit(types.LOGIN);

                router.push({path:'/contact'});
            });
    },

    logout({commit}) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        commit(types.LOGOUT);
        router.push({path: '/login'});
    },
};

const mutations = {
    [types.LOGIN] (state) {
        state.logged = 1;
    },

    [types.LOGOUT] (state) {
        state.logged = 0;
    },
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})