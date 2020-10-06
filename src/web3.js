import Web3 from "web3";

const web3 = new Web3(`https://data-seed-prebsc-1-s1.binance.org:8545`);

export const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.enable();
    return true;
  }
  return false;
};

export default web3;
