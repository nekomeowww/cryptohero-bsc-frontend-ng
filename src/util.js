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

/**
 * Get the Cookie associate with current window's Origin based on given Cookie name
 * 根据给定的 Cookie 名称获取当前 Window 的域名归属 Cookie
 * @param {String} cname   - Cookie's name Cookie 的名字
 */
export const getCookie = cname => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  debugger;
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  debugger;
  return "";
};

/**
 * Set the Cookie associate with current window's origin based on given name and token
 * 根据给定的 Cookie 名字和 Cookie Token 设置到当前窗口域名归属的 Cookie
 * @param {String} cname   - Cookie's name Cookie 的名字
 * @param {String} token   - Cookie 的存储值
 * @param {Number} exp     - Cookie 失效的时间，顺延时间，以 天数 为单位
 */
export const setCookie = (cname, token, exp) => {
  const date = new Date(Date.now());
  date.setDate(date.getDate() + exp);

  document.cookie = cname + "=" + token + "; expires=" + date.toUTCString();
};

/**
 * Clear the Cookie based on the given name
 * 清除指定 的 Cookie
 * @param {String} cname   - Cookie's name Cookie 的名字
 */
export const clearCookie = cname => {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
