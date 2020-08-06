import Cookie from "js-cookie";
// import { BigNumber } from 'bignumber.js';
import web3 from "@/web3";
import * as config from "@/config";
import timeout from "timeout-then";
import cryptoWaterMarginABI from "./abi/cryptoWaterMargin.json";
import ERC20ABI from "./abi/ERC20.json";
import BatchGetCardsABI from "./abi/BatchGetCards.json";

const network = config.network[4];
const cryptoWaterMarginContract = new web3.eth.Contract(
  cryptoWaterMarginABI,
  network.contract
);
const erc20Token = new web3.eth.Contract(ERC20ABI, network.token);

const BatchGetCards = new web3.eth.Contract(
  BatchGetCardsABI,
  "0x6fa9CF4755C180bDddd74847BA1c95587701516A"
);

let store = [];
let isInit = false;

export const getStoreData = async () => {
  // @todo: impl needed
};

export const getPayTokenInfo = async () => {
  const [name, symbol, decimals] = await Promise.all([
    erc20Token.methods.name().call(),
    erc20Token.methods.symbol().call(),
    erc20Token.methods.decimals().call()
  ]);
  return { name, symbol, decimals };
};

export const getMe = async () => {
  if (!window.ethereum) {
    throw Error("NO_METAMASK");
  }
  await window.ethereum.enable();
  const [address] = await web3.eth.getAccounts();
  if (!address) throw Error("METAMASK_NOT_ENABLED");
  return address;
};

export const getAnnouncements = async () => {
  return [];
};

export const getGg = async (id, time = 0) => {
  if (!isInit) {
    return timeout((time + 1) * 500).then(() => getGg(id, time + 1));
  }

  const item = store.find(x => x.id === `${id}`);

  if (item && item.str) {
    return item.str;
  }

  return "";
};

// 获取此卡片的推荐nextPrice，需要和卡片blockchain上的nextPrice进行比较，选择较大的创建交易
export const getNextPrice = async (id, time = 0) => {
  if (!isInit) {
    if (time >= 1500) {
      return 0;
    }

    return timeout((time + 1) * 500).then(() => getNextPrice(id, time + 1));
  }

  const item = store.find(x => x.id === `${id}`);

  if (item && item.nextPrice) {
    // Convert nextPrice from 'ether' to 'wei'
    return web3.utils.toWei(item.nextPrice, "ether");
  }

  return 0;
};

export const getItem = async id => {
  const exist = await cryptoWaterMarginContract.methods.tokenExists(id).call();
  if (!exist) return null;
  const card = config.cards[id] || {};
  const item = {
    id,
    name: card.name,
    nickname: card.nickname
  };
  const {
    _owner,
    _price,
    _nextPrice
  } = await cryptoWaterMarginContract.methods.allOf(id).call();
  [item.owner, item.price, item.nextPrice] = [_owner, _price, _nextPrice];

  // [[item.owner, item.price, item.nextPrice], item.estPrice] = await Promise.all([
  //   Promise.promisify(cryptoWaterMarginContract.methods.allOf)(id),
  //   getNextPrice(id)]);
  // item.price = BigNumber.maximum(item.price, item.estPrice);
  return item;
};

export const BatchGetCardsItem = async () => {
  const rawResultArray = await BatchGetCards.methods
    .getCard(network.contract, 114)
    .call();
  const cards = rawResultArray.map(({ id, nextPrice, owner, price }) => {
    const card = config.cards[id] || {};
    return {
      id,
      nextPrice,
      owner,
      price,
      name: card.name,
      nickname: card.nickname
    };
  });
  return cards;
};

export const approveSpending = (price, from) =>
  erc20Token.methods.approve(network.contract, price).send({
    from
  });

export const buyItem = (id, from) =>
  cryptoWaterMarginContract.methods.buy(id).send({
    from
  });

export const getTokenBalanceOf = address =>
  erc20Token.methods.balanceOf(address).call();

export const getTotal = () =>
  cryptoWaterMarginContract.methods.totalSupply().call();

export const getItemIds = async (offset, limit) => {
  let ids = await cryptoWaterMarginContract.methods
    .itemsForSaleLimit(offset, limit)
    .call();
  ids = ids.map(id => Number(id));
  ids.sort((a, b) => a - b);
  return Array.from(new Set(ids));
};

export const isItemMaster = async id => {
  const me = await getMe();
  const item = await getItem(id);

  return me && item && item.owner && me === item.owner;
};

export const getItemsOf = async address => {
  let ids = await cryptoWaterMarginContract.methods.tokensOf(address).call();
  ids = ids.map(id => Number(id));
  ids.sort((a, b) => a - b);
  return Array.from(new Set(ids));
};

export const getNetwork = async () => {
  const netId = await web3.eth.getChainId();
  return config.network[netId];
};

export const getLocale = async () =>
  Cookie.get("locale") ||
  (
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage
  ).toLowerCase();

export const setLocale = async locale => {
  Cookie.set("locale", locale, { expires: 365 });
};
