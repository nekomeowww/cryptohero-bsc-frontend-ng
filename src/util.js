// import web3 from "@/web3";
import { BigNumber } from "bignumber.js";

export const toReadablePrice = (fromPrice, decimals) => {
  const decimalUnit = new BigNumber(10).pow(decimals);
  const price = new BigNumber(fromPrice).div(decimalUnit).toString();
  return { price };
};

function utoa(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
// base64 encoded ascii to ucs-2 string
function atou(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export const encryptText = s => {
  try {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i = 1; i < data.length; i++) {
      currChar = data[i];
      if (dict[phrase + currChar] != null) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + currChar] = code;
        code++;
        phrase = currChar;
      }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var j = 0; j < out.length; j++) {
      out[j] = String.fromCharCode(out[j]);
    }
    return utoa(out.join(""));
  } catch (e) {
    console.log("Failed to zip string return empty string", e);
    return "";
  }
};

export const decryptText = base64ZippedString => {
  try {
    var s = atou(base64ZippedString);
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
      var currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
        phrase = data[i];
      } else {
        phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
    }
    return out.join("");
  } catch (e) {
    console.log("Failed to unzip string return empty string", e);
    return "";
  }
};

export const getAppName = () => {
  const appName = process.env.VUE_APP_DisplayAppName;
  if (appName) return process.env.VUE_APP_DisplayAppName;
  else return "Yet another TokenHero";
};
