import Vue from "vue";
import vueConfig from "vue-config";
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
