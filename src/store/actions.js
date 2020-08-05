// https://vuex.vuejs.org/en/actions.html

import * as api from "@/api";

export default {
  async initLocale({ commit }) {
    const locale = await api.getLocale();
    commit("setLocale", locale);
  },
  async setLocale({ commit }, locale) {
    await api.setLocale(locale);
    commit("setLocale", locale);
  },
  async FETCH_ME({ commit, dispatch }) {
    try {
      const me = await api.getMe();
      commit("SET_ME", me);
      dispatch("FetchPayTokenInfo");
      commit("SET_SIGN_IN_ERROR", null);
    } catch (e) {
      commit("SET_ME", null);
      commit("SET_SIGN_IN_ERROR", e.message);
    }
  },
  async FETCH_ITEM({ commit }, id) {
    const item = await api.getItem(id);
    commit("SET_ITEM", { id, item });
  },
  async FETCH_AD({ commit }, id) {
    const ad = await api.getGg(id);
    commit("SET_AD", { id, ad });
  },
  async FetchPayTokenInfo({ commit, dispatch }) {
    const info = await api.getPayTokenInfo();
    commit("SetPayTokenInfo", info);
    dispatch("FetchTokenBalance");
  },
  async FetchTokenBalance({ state, commit }) {
    const balance = await api.getTokenBalanceOf(state.me);
    commit("SetPayTokenBalance", balance);
  },
  async FetchCards({ commit }) {
    const items = await api.BatchGetCardsItem();
    commit("BATCH_SET_ITEMS", items);
  }
};
