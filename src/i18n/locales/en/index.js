/* eslint-disable import/no-webpack-loader-syntax */
import FAQS_CONTENT from 'raw-loader!./faq.html'
import PRIVACY_CONTENT from 'raw-loader!./privacy.html'
import TERMS_CONTENT from 'raw-loader!./terms.html'
import { getAppName } from '../../../util'

export default {
  TokenHero: getAppName(),
  'My Cards': 'My Cards',
  'Sign In': 'Sign In',
  Home: 'Home',
  FAQs: 'FAQs',
  Owner: 'Owner',
  'Current Price': 'Current Price',
  Buy: 'Buy',
  'Terms of Service': 'Terms',
  'Privacy Policy': 'Privacy',
  'Contact Us': 'Contact',
  Slogan: 'Slogan',
  UPDATE_SLOGAN_PROMPT: 'Please enter your slogan (Up to 100 characters):',
  UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG:
    'The slogan can only be 100 characters long.',
  EDIT_SLOGAN_TIP: 'After purchasing this card, you can edit the slogan.',
  BUY_SUCCESS_MSG:
    'The payment is successful, please wait for the miner to confirm, refresh again later.',
  BUY_FAIL_MSG: 'Failed, refresh the page and try again.',
  'Edit Slogan': 'Edit Slogan',
  'Claim Lucky Token': 'Claim Lucky Token',
  isLuckyClaim: 'is LuckyToken claimed?',
  User: 'User',
  'His Cards': 'His/Her Cards',
  BUY_BTN: 'Buy',
  BUYING_BTN: 'Buying...',
  PREMIUM_BUY_BTN: '{rate} Premium to buy',
  BUY_PRICE_TIP:
    'The higher the bid, the greater the chance of getting it. Use 100+gas to make the transaction proved fast!',
  FAQs_CONTENT: FAQS_CONTENT,
  PRIVACY_CONTENT: PRIVACY_CONTENT,
  TERMS_CONTENT: TERMS_CONTENT,
  'MetaMask is locked': 'Your MetaMask is locked',
  UnlockYourMetaMask:
    'Please open MetaMask and follow the instructions to unlock it.',
  NoMetaMaskTitle: 'What’s this meow!?',
  NoMetaMaskMsg:
    'You can only play me on a desktop browser like Chrome or Firefox.',
  LoginOKTitle: 'Welcome Back!',
  LoginOKMsg: 'Click Here to see your collection'
}
