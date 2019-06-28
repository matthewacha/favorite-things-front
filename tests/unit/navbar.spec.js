import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import sinon from "sinon";
import Vuex from "vuex";
import userService from "../../src/services/userService";
import TheNavbar from "@/views/TheNavbar.vue";

Vue.use(Vuex);

describe("Login.vue", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(TheNavbar);
    expect(wrapper.element).toMatchSnapshot();
  });
});

// describe("test it works", () => {
//   let actions;
//   let store;

//   beforeEach(() => {
//     actions = {
//       user: sinon.stub()
//     };
//     store = new Vuex.Store({
//       state: {},
//       actions
//     });
//   });

//   it("loads the navbar component", () => {
//     const wrapper = shallowMount(TheNavbar);
//     console.log(wrapper);
//   });
// });
