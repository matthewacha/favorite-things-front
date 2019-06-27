import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    userError: '',
  },
  mutations: {
    user: (state, data) => {
      state.userData = data;
    },
    userError: (state, data) => {
      state.userError = data;
    }
  },
  actions: {
    user: ({ commit }, data) => {
      commit('user', data);
    },
    userError: ({ commit }, data) => {
      commit('userError', data)
    }
  },
});
