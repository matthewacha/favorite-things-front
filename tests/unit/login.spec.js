import Vue from 'vue';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import sinon from 'sinon';
import Vuetify from 'vuetify';
import { expect } from 'chai';
import Vuex from 'vuex';
import userService from '../../src/services/userService';
import Login from '../../src/components/Login.vue';


Vue.use(Vuex);
Vue.use(Vuetify);

const userObject = {
  user: {
    id: 1,
  },
};
const localStorage = {
  getItem: user => JSON.stringify(userObject),
  setItem: (user) => {},
};
global.localStorage = localStorage;


describe('Login.vue', () => {
  it('renders login page properly', () => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    const wrapper = shallowMount(Login, { sync: false });
    expect(wrapper.html()).to.contain('form');
  });
});

describe('test login functionality', () => {
  let actions;
  let store;
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  beforeEach(() => {
    actions = {
      user: sinon.stub(),
    };
    store = new Vuex.Store({
      state: {},
      actions,
    });
  });

  it('redirects when login successful', () => {
    const wrapper = mount(Login, { sync: false, store });
    Object.defineProperty(userService, 'postUser', {
      value: () => Promise.resolve({
        data: {
          message: 'user exists',
          success: true,
          user: { name: 'ease-e', id: 36 },
        },
      }),
    });
    const spy = sinon.spy(userService, 'postUser');
    wrapper.vm.$refs.form = {
      $el: [{ value: 'ease-e' }],
    };
    wrapper.vm.$refs.form.validate = () => true;
    const submitForm = wrapper.find('button');
    submitForm.trigger('click');
    expect(spy.called).to.be.true;
  });

  it('it throws notification when error emitted', () => {
    const wrapper = mount(Login, { store });
    Object.defineProperty(userService, 'postUser', {
      value: () => Promise.reject(new Error('Network Error')),
    });
    const spy = sinon.spy(userService, 'postUser');
    wrapper.vm.$refs.form = {
      $el: [{ value: 'ease-e' }],
    };
    wrapper.vm.$refs.form.validate = () => true;

    const submitForm = wrapper.find('button');
    submitForm.trigger('click');
    expect(spy.called).to.be.true;
  });
});
