import Web3 from "web3";

const web3 = new Web3(
  Web3.givenProvider ||
    new Web3.providers.HttpProvider(
      `https://rinkeby.infura.io/v3/${process.env.VUE_APP_InfuraID}`
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
