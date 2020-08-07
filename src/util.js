// import web3 from "@/web3";
import { BigNumber } from "bignumber.js";

export const toReadablePrice = (fromPrice, decimals) => {
  const decimalUnit = new BigNumber(10).pow(decimals);
  const price = new BigNumber(fromPrice).div(decimalUnit).toString();
  return { price };
};

export const getAppName = () => {
  const appName = process.env.VUE_APP_DisplayAppName;
  if (appName) return process.env.VUE_APP_DisplayAppName;
  else return "Yet another TokenHero";
};
