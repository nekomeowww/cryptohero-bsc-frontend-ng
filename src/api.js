import Cookie from "js-cookie";
// import { BigNumber } from 'bignumber.js';
import web3 from "@/web3";
import * as config from "@/config";
import timeout from "timeout-then";
import cryptoWaterMarginABI from "./abi/cryptoWaterMargin.json";

const network = config.network[4];
const cryptoWaterMarginContract = new web3.eth.Contract(
  cryptoWaterMarginABI,
  network.contract
);

let store = [];
let isInit = false;

export const getStoreData = async () => {
  // @todo: impl needed
};

export const getMe = async () => {
  if (!window.ethereum) {
    throw Error("NO_METAMASK");
  }
  const [address] = await web3.eth.getAccounts();
  return address;
};

export const getAnnouncements = async () => {
  return [];
};

export const getGg = async (id, time = 0) => {
  if (!isInit) {
    return timeout((time + 1) * 500).then(() => getGg(id, time + 1));
  }

  const item = store.find((x) => x.id === `${id}`);

  if (item && item.str) {
    return item.str;
  }

  return "";
};

export const setGg = async (id, str) => {
  // @todo: need impl
  // const response = await request
  //   .get("https://api.leancloud.cn/1.1/classes/ad")
  //   .set({
  //     "X-LC-Id": "R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz",
  //     "X-LC-Key": "8R6rGgpHa0Y9pq8uO53RAPCB",
  //   })
  //   .type("json")
  //   .accept("json");
  // if (response.body && response.body.results) {
  //   store = response.body.results;
  // }
  // const item = store.find((x) => x.id === `${id}`);
  // if (item) {
  //   // update
  //   await request
  //     .put(`https://api.leancloud.cn/1.1/classes/ad/${item.objectId}`)
  //     .set({
  //       "X-LC-Id": "R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz",
  //       "X-LC-Key": "8R6rGgpHa0Y9pq8uO53RAPCB",
  //     })
  //     .type("json")
  //     .accept("json")
  //     .send({
  //       str,
  //     });
  //   // update store
  //   item.str = str;
  // } else {
  //   // create
  //   await request
  //     .post("https://api.leancloud.cn/1.1/classes/ad")
  //     .set({
  //       "X-LC-Id": "R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz",
  //       "X-LC-Key": "8R6rGgpHa0Y9pq8uO53RAPCB",
  //     })
  //     .type("json")
  //     .accept("json")
  //     .send({
  //       id: `${id}`,
  //       str,
  //     });
  //   // update store
  // }
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

  const item = store.find((x) => x.id === `${id}`);

  if (item && item.nextPrice) {
    // Convert nextPrice from 'ether' to 'wei'
    return web3.utils.toWei(item.nextPrice, "ether");
  }

  return 0;
};

// price为用户成功发起交易的交易价格，调用setNextPrice后，nextPrice会变为此价格的1.1倍
export const setNextPrice = async (id, price) => {
  // @todo: need rewrite
  return price * 1.1;
};

export const getItem = async (id) => {
  const exist = await cryptoWaterMarginContract.methods.tokenExists(id).call();
  if (!exist) return null;
  const card = config.cards[id] || {};
  const item = {
    id,
    name: card.name,
    nickname: card.nickname,
  };
  [
    item.owner,
    item.price,
    item.nextPrice,
  ] = await cryptoWaterMarginContract.methods.allOf(id).call();

  // [[item.owner, item.price, item.nextPrice], item.estPrice] = await Promise.all([
  //   Promise.promisify(cryptoWaterMarginContract.methods.allOf)(id),
  //   getNextPrice(id)]);
  // item.price = BigNumber.maximum(item.price, item.estPrice);
  return item;
};

export const buyItem = (id, price) =>
  cryptoWaterMarginContract.methods.buy(id).send({
    value: price, // web3.utils.toWei(Number(price), 'ether'),
    gas: 220000,
    gasPrice: 1000000000 * 100,
  });

export const getTotal = () =>
  cryptoWaterMarginContract.methods.totalSupply().call();

export const getItemIds = async (offset, limit) => {
  let ids = await cryptoWaterMarginContract.methods
    .itemsForSaleLimit(offset, limit)
    .call();
  ids = ids.map((id) => id.toNumber());
  ids.sort((a, b) => a - b);
  return Array.from(new Set(ids));
};

export const isItemMaster = async (id) => {
  const me = await getMe();
  const item = await getItem(id);

  return me && me.address && item && item.owner && me.address === item.owner;
};

export const getItemsOf = async (address) => {
  let ids = await cryptoWaterMarginContract.methods.tokensOf(address).call();
  ids = ids.map((id) => id.toNumber());
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

export const setLocale = async (locale) => {
  Cookie.set("locale", locale, { expires: 365 });
};
