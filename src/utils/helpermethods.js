export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    localStorage.removeItem(key + "_expiresIn");
  } catch (e) {
    console.log(
      "removeStorage: Error removing key [" +
        key +
        "] from localStorage: " +
        JSON.stringify(e)
    );
    return false;
  }
  return true;
}

export function getStorage(key) {
  let now = Date.now();

  // set expiration for storage
  let expiresIn = localStorage.getItem(key + "_expiresIn");
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }

  if (expiresIn < now) {
    // Expired
    removeStorage(key);
    return null;
  } else {
    try {
      var value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (e) {
      console.log(
        "getStorage: Error reading key [" +
          key +
          "] from localStorage: " +
          JSON.stringify(e)
      );
      return null;
    }
  }
}

export function setStorage(key, value, expires) {
  let expirationTime;
  if (expires === undefined || expires === null) {
    expirationTime = 24 * 60 * 60; // default: seconds for 1 day
  } else {
    expirationTime = Math.abs(expires); //make sure it's positive
  }

  let now = Date.now(); //millisecs since epoch time, lets deal only with integer
  let schedule = now + expirationTime * 1000;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key + "_expiresIn", schedule);
  } catch (e) {
    console.log(
      "setStorage: Error setting key [" +
        key +
        "] in localStorage: " +
        JSON.stringify(e)
    );
    return false;
  }
  return true;
}

let cipher = salt => {
  let textToChars = text => text.split("").map(c => c.charCodeAt(0));
  let byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text =>
    text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
};

export let keyCipher = cipher("ui_servey");

let decipher = salt => {
  let textToChars = text => text.split("").map(c => c.charCodeAt(0));
  let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded =>
    encoded
      .match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join("");
};

export let keyDecipher = decipher("ui_servey");

export const isEmail = string => {
  // eslint-disable-next-line no-useless-escape
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (string.trim().match(regEx)) return true;
  else return false;
};

export const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};
