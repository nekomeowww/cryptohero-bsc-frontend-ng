import Vue from "vue";
import vueConfig from "vue-config";
import i18n from "./i18n";
import VueLazyload from "vue-lazyload";
import AsyncComputed from "vue-async-computed";
import * as config from "@/config";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueLazyload);
Vue.use(AsyncComputed);
Vue.use(vueConfig, config);
Vue.config.devtools = true;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
