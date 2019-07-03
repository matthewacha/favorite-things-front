/* eslint-disable no-unused-expressions */
import Vue from "vue";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { expect } from "chai";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import sinon from "sinon";
import Vuex from "vuex";
import userService from "../../src/services/userService";
import FavoriteDashboard from "../../src/components/FavoriteDashboard.vue";
import store from "../../src/store";
import favoriteService from "../../src/services/favoriteService";
// import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Vue.use(Vuetify);
// const { expect } = chai;
const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
const userObject = {
  user: {
    id: 1
  }
};
const localStorage = {
  getItem: user => JSON.stringify(userObject),
  setItem: () => {}
};
global.localStorage = localStorage;

const app = document.createElement("div");
app.setAttribute("data-app", true);
document.body.appendChild(app);

describe("FavoriteDashboard.vue", () => {
  // let store;
  let actions;
  let getters;

  beforeEach(() => {
    actions = {
      user: sinon.stub()
    };
    getters = {
      favoritesList: []
    };
    //   store = new Vuex.Store({
    //     state: {},
    //     actions,
    //     getters,
    //   });
    Object.defineProperty(favoriteService, "getFavorites", {
      value: id =>
        Promise.resolve({
          data: [
            {
              customuser: id,
              title: "main test is here",
              description: "helping hand",
              ranking: 7,
              category: "pe",
              metadata: '"{}"'
            },
            {
              customuser: id,
              title: "riding",
              description: "like feeling the wind on my bald head",
              ranking: 8,
              category: "pe",
              metadata: '"{}"'
            }
          ]
        })
    });
  });
  it("renders dashboard properly", () => {
    const wrapper = mount(FavoriteDashboard, { sync: false, store });
    expect(wrapper.html()).contains('form');
    expect(wrapper.html()).contains('ADD NEW FAVORITE');
  });

  it("it has the child components", () => {
    const wrapper = shallowMount(FavoriteDashboard, { sync: false, store });
    expect(wrapper.contains(".favorite-dash_panel--right")).to.be.true;
    expect(wrapper.contains(".favorite-dash_panel--left")).to.be.true;
  });

  it("it mounts favorites list", () => {
    const wrapper = mount(FavoriteDashboard, { sync: false, store });
    expect(wrapper.find(".item-title").text()).to.be.equal("MAIN TEST IS HERE");
    expect(wrapper.contains(".favorite-dash_panel--right")).to.be.true;
    expect(wrapper.contains(".favorite-dash_panel--left")).to.be.true;
  });

  it("switch to edit form when edit is click on item", async() => {
    const wrapper = await mount(FavoriteDashboard, { sync: false, store });
    const wrapperDrop = wrapper.find("button#edit-fav");
    wrapperDrop.trigger('click');
    expect(wrapper.vm.cardTitle).to.equal('EDIT NEW FAVORITE')
  });
});
