import Vue from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import sinon from 'sinon';
import Vuex from 'vuex';
import userService from '../../src/services/userService';
import Login from '@/components/Login.vue';


Vue.use(Vuex);

describe('Login.vue', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('test login functionality', () => {
  let actions;
  let store;

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
    const wrapper = mount(Login, { store });
    Object.defineProperty(userService, 'postUser', {
      value: () => Promise.resolve({
        data: {
          message: 'user exists',
          success: true,
          user: { name: 'ease-e', id: 36 },
        },
      }),
    });
    const spy = jest.spyOn(userService, 'postUser');
    wrapper.vm.$refs.form = {
      $el: [{ value: 'ease-e' }],
    };
    wrapper.vm.$refs.form.validate = () => true;

    const submitForm = wrapper.find('v-btn');
    submitForm.trigger('click');
    expect(spy).toBeCalled();
  });

  it('it throws notification when error emitted', () => {
    const wrapper = mount(Login, { store });
    Object.defineProperty(userService, 'postUser', {
      value: () => Promise.reject(new Error('Network Error')),
    });
    const spy = jest.spyOn(userService, 'postUser');
    wrapper.vm.$refs.form = {
      $el: [{ value: 'ease-e' }],
    };
    wrapper.vm.$refs.form.validate = () => true;

    const submitForm = wrapper.find('v-btn');
    submitForm.trigger('click');
    expect(spy).toBeCalled();
  });
});
