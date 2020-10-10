import cardsData from './cards.json'

export const network = {
  97: {
    name: 'Binance Testnet',
    contract: process.env.VUE_APP_WaterMarginContract,
    token: process.env.VUE_APP_PayWithTokenContract // TOOTH on testnet
  }
}

export const cards = cardsData

export const i18n = [
  {
    langDisplay: '中文',
    locale: 'zh',
    aliases: ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw']
  },
  {
    langDisplay: 'English',
    locale: 'en',
    aliases: [
      'en',
      'en-us',
      'en-au',
      'en-bz',
      'en-ca',
      'en-ie',
      'en-jm',
      'en-nz',
      'en-ph',
      'en-za',
      'en-tt',
      'en-gb',
      'en-zw'
    ]
  },
  {
    langDisplay: '日本語',
    locale: 'jp',
    aliases: ['jp', 'ja', 'ja-jp']
  }
]
