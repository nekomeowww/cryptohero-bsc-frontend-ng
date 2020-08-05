import cardsData from "./cards.json";

export const network = {
  4: {
    name: "Rinkeby Test Network",
    contract: "0x8bAFA09A4D227B78405345E11bfD094819a50135",
    token: "0x11F79a96a62D2Ba4A2411746e772A164608b511c" // TOOTH on testnet
  }
};

export const cards = cardsData;

export const i18n = [
  {
    langDisplay: "中文",
    locale: "zh",
    aliases: ["zh", "zh-cn", "zh-hk", "zh-sg", "zh-tw"]
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
      "en-zw"
    ]
  },
  {
    langDisplay: "日本語",
    locale: "jp",
    aliases: ["jp", "ja", "ja-jp"]
  }
];
