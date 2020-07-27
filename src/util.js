import web3 from '@/web3';
import { BigNumber } from 'bignumber.js';

export const toReadablePrice = (fromPrice, fromUnit = 'wei') => {
  const priceInWei = web3.utils.toWei(fromPrice, fromUnit);
  let price;
  let unit;

  if (BigNumber(priceInWei).isLessThan(BigNumber('10000000000000'))) {
    price = priceInWei;
    unit = 'Wei';
  } else {
    price = web3.utils.fromWei(priceInWei, 'ether');
    unit = 'ETH';
  }
  return { price, unit };
};
