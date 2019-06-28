import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    userError: '',
    favoritesList: [],
  },
  getters: {
    userError: state => state.userError,
    favoritesList: state => state.favoritesList.map((item) => {
      item.ranking /= 2;
      return item;
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  },
  mutations: {
    user: (state, data) => {
      state.userData = data;
    },
    userError: (state, data) => {
      state.userError = data;
    },
    favoritesList: (state, data) => {
      state.favoritesList = data;
    },
    postFavPending: (state, data) => {
      const old = [...state.favoritesList, data];
      state.favoritesList = old;
    },
    delFavPending: (state, data) => {
      const old = state.favoritesList.filter(fav => fav.id !== data.id);
      state.favoritesList = old;
    },
  },
  actions: {
    user: ({ commit }, data) => {
      commit('user', data);
    },
    userError: ({ commit }, data) => {
      commit('userError', data);
    },
    favoritesList: ({ commit }, data) => {
      commit('favoritesList', data);
    },
    postFavPending: ({ commit }, data) => {
      commit('postFavPending', data)
    },
    delFavPending: ({ commit }, data) => {
      commit('delFavPending', data)
    },
  },
});
