/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    isLoading: false,
    userError: '',
    favoritesList: [],
    filteredFavorite: [],
    isFiltered: false,
    edited: { value: false, favId: 0 },
  },
  getters: {
    userError: state => state.userError,
    favoritesList: (state) => {
      let returnedFavorites = state.favoritesList;
      if (state.isFiltered) {
        returnedFavorites = state.filteredFavorite;
      }
      return returnedFavorites.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
    favoritesListClean: state => state.favoritesList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  },
  mutations: {
    user: (state, data) => {
      state.userData = data.data;
      state.isLoading = data.isLoading;
    },
    userError: (state, data) => {
      state.userError = data;
    },
    favoritesList: (state, data) => {
      state.favoritesList = data.data;
      state.isLoading = data.isLoading;
    },
    postFavPending: (state, data) => {
      const old = [...state.favoritesList, data];
      state.favoritesList = old;
    },
    delFavPending: (state, data) => {
      const old = state.favoritesList.filter(fav => fav.id !== data.id);
      const deleteFavList = state.filteredFavorite.filter(fav => fav.id !== data.id);
      state.favoritesList = old;
      state.filteredFavorite = deleteFavList;
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
              return criteria.value === fav.ranking;
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
    isLoading: (state, data) => {
      state.isLoading = data;
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
    isLoading: ({ commit }, data) => {
      commit('isLoading', data);
    },
  },
});
