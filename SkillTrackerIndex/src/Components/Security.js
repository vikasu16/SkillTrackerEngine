var CryptoJS = require("crypto-js");

var SECRET_KEY = "J!twon*rps*";

function decryptKey(key) {
  var data = localStorage.getItem(key);
  if (data !== null) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);
  }
  return data;
}

export const Encryption = (key, data) => {
  var SECRET_KEY = "J!twon*rps*";
  data = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  var localData = localStorage.getItem(key);
  if (localData === null) {
    localStorage.setItem(key, data);
  } else {
    localStorage.removeItem(key);
    localStorage.setItem(key, data);
  }
  return data;
};

export const Decryption = (key) => {
  return decryptKey(key);
};

export const Hashing = (key) => {
  key = CryptoJS.SHA256(key, SECRET_KEY);

  return key.toString();
};

export const ValidToken = () => {
  var timeout = new Date(decryptKey("expiration_time"));
  var currenttime = new Date();

  if (currenttime > timeout) {
    localStorage.clear();
    return false;
  }
  return true;
};

export const GenerateToken = () => {
  var token = localStorage.getItem("access_token");
  if (token !== null) {
    token = decryptKey("access_token");
    return "Bearer " + token;
  }
  return "";
};
