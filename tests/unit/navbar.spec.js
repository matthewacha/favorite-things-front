/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import { expect } from 'chai';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import TheNavbar from '../../src/views/TheNavbar.vue';

Vue.use(Vuex);
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);
localVue.use(Vuex);

describe('Navbar.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(TheNavbar, {
      localVue,
    });
    expect(wrapper.html()).to.contain('img');
  });
});

describe('test it works', () => {
  it('loads the navbar component', () => {
    const wrapper = shallowMount(TheNavbar);
    expect(wrapper.contains('img#imageIcon')).to.be.true;
  });
});
