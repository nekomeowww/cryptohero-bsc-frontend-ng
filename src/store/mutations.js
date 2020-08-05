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
  BATCH_SET_ITEMS(state, items) {
    items.forEach(item => {
      Vue.set(state.items, item.id, item);
    });
  },
  SET_AD(state, { id, ad }) {
    Vue.set(state.ads, id, ad);
  },
  SetPayTokenInfo(state, info) {
    state.payTokenInfo = info;
  },
  SetPayTokenBalance(state, balance) {
    Vue.set(state.payTokenInfo, "balance", balance);
  }
};
