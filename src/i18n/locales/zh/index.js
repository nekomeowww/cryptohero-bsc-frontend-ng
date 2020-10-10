/* eslint-disable import/no-webpack-loader-syntax */
import FAQS_CONTENT from 'raw-loader!./faq.html'
import PRIVACY_CONTENT from 'raw-loader!./privacy.html'
import TERMS_CONTENT from 'raw-loader!./terms.html'
import { getAppName } from '../../../util'

export default {
  TokenHero: getAppName(),
  'My Cards': '我的卡牌',
  'Sign In': '登录游戏',
  Home: '首页',
  FAQs: '常见问题',
  Owner: '拥有者',
  'Current Price': '当前价格',
  Buy: '购买',
  'Terms of Service': '使用条款',
  'Privacy Policy': '隐私政策',
  'Contact Us': '联系我们',
  Slogan: '标语',
  EDIT_SLOGAN_TIP: '购买此卡后，您可以编辑标语。',
  'Edit Slogan': '编辑标语',
  'Claim Lucky Token': '申请 LuckyToken',
  isLuckyClaim: '已获赠 LuckyToken',
  BUY_SUCCESS_MSG: '支付成功，请等待矿工确认，稍后再来刷新看看吧。',
  BUY_FAIL_MSG: '失败了，刷新网页再试试.',
  UPDATE_SLOGAN_PROMPT: '请输入您的标语内容(最长100个字符)：',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: '标语最长只能100个字符',
  UPDATE_SLOGAN_FAIL_MSG: '失败了，刷新网页再试试.',
  User: '用户',
  'His Cards': 'TA的卡牌',
  BUY_BTN: '正价买入',
  BUYING_BTN: '正在购买...',
  PREMIUM_BUY_BTN: '溢价{rate}买入',
  BUY_PRICE_TIP:
    '出价越高，抢到的几率越大! 推荐使用100+gas，提高交易确认速度！',
  FAQs_CONTENT: FAQS_CONTENT,
  PRIVACY_CONTENT: PRIVACY_CONTENT,
  TERMS_CONTENT: TERMS_CONTENT,
  'MetaMask is locked': '你的 MetaMask 没有解锁',
  UnlockYourMetaMask:
    'Please open MetaMask and follow the instructions to unlock it.',
  NoMetaMaskTitle: '什么喵！？',
  NoMetaMaskMsg:
    '你只能在支持 Web3 的浏览器（如 Google Chrome 或 FireFox），并安装 MetaMask 插件才能正常使用这个网站',
  LoginOKTitle: '欢迎回来',
  LoginOKMsg: '点击这里查看你的卡片收藏',
  YourReferral: '你的推荐人',
  ChangeReferral: '你可以获取一个新的推荐链接来改变推荐人',
  RevokeReferral: '撤销当前推荐人'
}
