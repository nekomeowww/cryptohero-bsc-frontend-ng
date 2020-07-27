// https://vuex.vuejs.org/en/mutations.html

import Vue from "vue";

export default {
  setLocale(state, locale) {
    state.locale = locale;
  },
  SET_ME(state, me) {
    state.me = me;
  },
  SET_SIGN_IN_ERROR(state, error) {
    state.signInError = error;
  },
  SET_ITEM(state, { id, item }) {
    Vue.set(state.items, id, item);
  },
  SET_AD(state, { id, ad }) {
    Vue.set(state.ads, id, ad);
  }
  /* Examples:
  [types.ADD_TO_CART](state, payload) {
    state.cart.push(payload);
  },
  // this.$store.commit(types.ADD_TO_CART, product);

  increment(state) {
    state.count++;
  },
  // this.$store.commit('increment');
  */
};
