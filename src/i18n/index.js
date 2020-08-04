import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "./locales/zh";
import en from "./locales/en";
import jp from "./locales/jp";

Vue.use(VueI18n);

const messages = {
  zh,
  "zh-cn": zh,
  "zh-hk": zh,
  "zh-sg": zh,
  "zh-tw": zh,
  en,
  jp: jp,
  ja: jp,
  "ja-jp": jp
};

// i18n.forEach(item => {
//   const locale = import(`./locales/${item.locale}`);
//   item.aliases.forEach(alias => {
//     messages[alias] = locale;
//   });
// });

export default new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages
});
