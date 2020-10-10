/* eslint-disable import/no-webpack-loader-syntax */
import FAQS_CONTENT from 'raw-loader!./faq.html'
import PRIVACY_CONTENT from 'raw-loader!./privacy.html'
import TERMS_CONTENT from 'raw-loader!./terms.html'
import { getAppName } from '../../../util'

export default {
  TokenHero: getAppName(),
  'My Cards': 'コレクションカード',
  'Sign In': 'サインイン',
  Home: 'ホーム',
  FAQs: 'よくある質問',
  Owner: '所有者',
  'Current Price': '今の価格',
  Buy: '購入',
  'Terms of Service': '利用規約',
  'Privacy Policy': 'プライバシーポリシー',
  'Contact Us': 'お問い合わせ',
  'Claim Lucky Token': 'LuckyToken 請求する',
  isLuckyClaim: 'LuckyToken 請求された?',
  Slogan: '広告ポジション',
  UPDATE_SLOGAN_PROMPT: 'スローガンを入力してください（100文字以内）:',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG: 'スローガンの制限は100文字以下。',
  EDIT_SLOGAN_TIP: 'このカードを購入したあと、スローガン編集が可能になる。',
  BUY_SUCCESS_MSG:
    '購入成功、鉱工の確認を待つ間、後ほどリフレッシュしてください。',
  BUY_FAIL_MSG: '失敗しました、リフレッシュしてもう一度試しましょう。',
  'Edit Slogan': 'スローガン編集',
  User: 'ユーザー',
  'His Cards': '彼・彼女のカード',
  BUY_BTN: '購入',
  BUYING_BTN: '購入中...',
  PREMIUM_BUY_BTN: '{rate}プレミアム購入',
  BUY_PRICE_TIP:
    '課金の総額が高くなると、カードの獲得率が一方になる。 トランザクション毎に100以上のガスを投入してこれ以上のスピードで確認される！',
  FAQs_CONTENT: FAQS_CONTENT,
  PRIVACY_CONTENT: PRIVACY_CONTENT,
  TERMS_CONTENT: TERMS_CONTENT,
  'MetaMask is locked': 'あなたのMetaMaskはロックされています',
  UnlockYourMetaMask: 'MetaMaskを開き、指示に従ってロックを解除してください。',
  NoMetaMaskTitle: 'あなたのブラウザはMetaMask Pluginを持っていません',
  NoMetaMaskMsg:
    'ChromeやFirefoxなどのデスクトップブラウザでのみ再生できます。',
  LoginOKTitle: 'お帰りなさい!',
  LoginOKMsg: 'あなたのカードコレクションを見るにはここをクリック'
}
