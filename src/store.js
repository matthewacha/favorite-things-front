import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    userError: '',
    favoritesList: [],
    filteredFavorite: [],
    isFiltered: false,
    edited: { value: false, favId: 0 },
  },
  getters: {
    userError: state => state.userError,
    favoritesList: (state) => {
      let returnedFavorites = [];
      if (state.isFiltered) {
        returnedFavorites = state.filteredFavorite;
      } else {
        returnedFavorites = state.favoritesList.map((item) => {
          item.ranking /= 2;
          return item;
        });
      }
      return returnedFavorites.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
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
    editFavPending: (state, data) => {
      const newArray = state.favoritesList.map((fav) => {
        if (fav.id === data.id) {
          fav.customuser = data.customuser;
          fav.title = data.title;
          fav.description = data.description;
          fav.ranking = data.ranking;
          fav.category = data.active;
          fav.metadata = data.metadata;
        }
        return fav;
      });
      state.favoritesList = newArray;
      state.edited = { value: true, favId: data.id };
    },
    filterFav: (state, data) => {
      const newArray = state.favoritesList.filter((fav) => {
        let truthCheck = [];
        truthCheck = data.map((criteria) => {
          switch (criteria.name) {
            case 'categories':
              return criteria.value.includes(fav.category);
            case 'ranking':
              return criteria.value / 2 === fav.ranking;
            default:
              return null;
          }
        });
        return truthCheck.includes(true);
      });
      state.isFiltered = true;
      state.filteredFavorite = newArray;
    },
    clearFilter: (state) => {
      state.isFiltered = false;
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
      commit('postFavPending', data);
    },
    delFavPending: ({ commit }, data) => {
      commit('delFavPending', data);
    },
    editFavPending: ({ commit }, data) => {
      commit('editFavPending', data);
    },
    filterFav: ({ commit }, data) => {
      commit('filterFav', data);
    },
    clearFilter: ({ commit }) => {
      commit('clearFilter');
    },
  },
});
