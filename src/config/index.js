import cardsData from "./cards.json";

export const network = {
  4: {
    name: "Rinkeby Test Network",
    contract: "0xfba3dd1b8459c0cbebc9259705c403e6815f9521",
    token: "0xdea119d27F53D98EFdB29e0B3ac06317BAF9667E",
  },
};

export const defaultNetwork = Object.values(network).find((net) => net.default);

export const cards = cardsData;

export const i18n = [
  {
    langDisplay: "中文",
    locale: "zh",
    aliases: ["zh", "zh-cn", "zh-hk", "zh-sg", "zh-tw"],
  },
  {
    langDisplay: "English",
    locale: "en",
    aliases: [
      "en",
      "en-us",
      "en-au",
      "en-bz",
      "en-ca",
      "en-ie",
      "en-jm",
      "en-nz",
      "en-ph",
      "en-za",
      "en-tt",
      "en-gb",
      "en-zw",
    ],
  },
  {
    langDisplay: "日本語",
    locale: "jp",
    aliases: ["jp", "ja", "ja-jp"],
  },
];
