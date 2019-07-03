/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import { expect } from 'chai';
import sinon from 'sinon';
import Vuex from 'vuex';
import FavoriteForm from '../../src/components/FavoritesForm.vue';
import store from '../../src/store';
import favoriteService from '../../src/services/favoriteService';

// Vue.use(Vuetify);
// const { expect } = chai;
const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
const userObject = {
  user: {
    id: 1,
  },
};
const localStorage = {
  getItem: user => JSON.stringify(userObject),
  setItem: () => {},
};
global.localStorage = localStorage;

const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.appendChild(app);

describe('FavoriteForm.vue', () => {
  // let store;
  let actions;
  let getters;

  beforeEach(() => {
    const serviceMethods = ['postFavorite', 'editFavorite'];
    actions = {
      user: sinon.stub(),
    };
    getters = {
      favoritesList: [],
    };
    //   store = new Vuex.Store({
    //     state: {},
    //     actions,
    //     getters,
    //   });
    serviceMethods.map(item => Object.defineProperty(favoriteService, item, {
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
    }));
  });
  it('renders properly', () => {
    const wrapper = shallowMount(FavoriteForm, { sync: false, store });
    expect(wrapper.contains('v-slider-stub')).to.be.true;
  });

  it('post favorite panel when click', async () => {
    const wrapper = await mount(FavoriteForm, { sync: false, attachToDocument: true, store });
    wrapper.setData({
      edit: false,
      formType: 'post',
      userId: 1,
      favoriteId: 1,
      categories: ['person', 'place', 'food'],
      ranking: 7,
      description: 'RIDING',
      metadata: undefined,
      title: 'words',
      active: 'pe',
      //   valid: true,
      titleRules: [
        v => !!v.trim() || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      descriptionRules: [
        v => !!v.trim() || 'Description is required',
        v => (v && v.length <= 250)
          || 'Description must be less than 250 characters',
      ],
    });
    const spy = sinon.spy(favoriteService, 'postFavorite');
    wrapper.vm.$refs.form = { validate: () => true };
    wrapper.vm.valid = true;
    const wrapperDrop = wrapper.find('button');
    wrapperDrop.trigger('click');
    expect(spy.called).to.be.true;
  });

  it('edit favorite panel when click', async () => {
    const wrapper = await mount(FavoriteForm, { sync: false, attachToDocument: true, store });
    wrapper.setData({
      edit: true,
      formType: 'post',
      userId: 1,
      favoriteId: 1,
      categories: ['person', 'place', 'food'],
      ranking: 7,
      description: 'RIDING',
      metadata: undefined,
      title: 'words',
      active: 'pe',
      titleRules: [
        v => !!v.trim() || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      descriptionRules: [
        v => !!v.trim() || 'Description is required',
        v => (v && v.length <= 250)
          || 'Description must be less than 250 characters',
      ],
    });
    wrapper.vm.$refs.form = { validate: () => true };
    wrapper.vm.valid = true;
    const wrapperDrop = wrapper.find('#cancel-edit');
    wrapperDrop.trigger('click');
    expect(wrapper.vm.title).to.be.equal('');
  });
});
