import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transitionName: "slide-l",
  },
  mutations: {
    setTransitionName(state, data) {
      state.transitionName = data;
    },
  },
});
