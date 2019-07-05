/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import FavoriteDashboard from '../../src/components/FavoriteDashboard.vue';
import store from '../../src/store';
import favoriteService from '../../src/services/favoriteService';


Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
const userObject = {
  user: {
    id: 1,
  },
};
const localStorage = {
  getItem: (user) => { user; return JSON.stringify(userObject); },
  setItem: () => {},
};
global.localStorage = localStorage;

const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.appendChild(app);

describe('FavoriteDashboard.vue', () => {
  beforeEach(() => {
    Object.defineProperty(favoriteService, 'getFavorites', {
      value: id => Promise.resolve({
        data: [
          {
            customuser: id,
            title: 'main test is here',
            description: 'helping hand',
            ranking: 7,
            category: 'pe',
            metadata: '"{}"',
          },
          {
            customuser: id,
            title: 'riding',
            description: 'like feeling the wind on my bald head',
            ranking: 8,
            category: 'pe',
            metadata: '"{}"',
          },
        ],
      }),
    });
  });
  it('renders dashboard properly', () => {
    const wrapper = mount(FavoriteDashboard, { sync: false, store });
    expect(wrapper.html()).contains('form');
    expect(wrapper.html()).contains('ADD NEW FAVORITE');
  });

  it('it mounts favorites list', () => {
    const wrapper = mount(FavoriteDashboard, { sync: false, store });
    expect(wrapper.contains('.favorite-dash_panel--right')).to.be.true;
    expect(wrapper.contains('.favorite-dash_panel--left')).to.be.true;
  });
});


describe('right disaplay panel', () => {
  beforeEach(() => {
    Object.defineProperty(favoriteService, 'getFavorites', {
      value: id => Promise.resolve({
        data: [],
      }),
    });
  });

  it('should show no favorites card when no favorites are returned', async () => {
    const wrapper = mount(FavoriteDashboard, { sync: false, store });
    const wrapperDrop = wrapper.find('.description-title');
    expect(wrapperDrop.text()).contains('You have no favorites');
  });
});
