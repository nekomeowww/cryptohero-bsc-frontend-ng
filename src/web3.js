import Web3 from "web3";


// const web3 = new Web3(`https://data-seed-prebsc-1-s1.binance.org:8545`);

const web3 = new Web3(
  Web3.givenProvider ||
    new Web3.providers.HttpProvider(
      `https://data-seed-prebsc-1-s1.binance.org:8545`      
      //`https://rinkeby.infura.io/v3/${process.env.VUE_APP_InfuraID}`
    )
);

export const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.enable();
    return true;
  }
  return false;
};

export default web3;
