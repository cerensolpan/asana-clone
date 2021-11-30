const CryptoJs = require("crypto-js");

const passwordToHash = (password) => {
    return CryptoJs.HmacSHA256(password,CryptoJs.HmacSHA1(password,process.env.PASSWORD_HASH).toString()).toString();
}

module.exports = {
    passwordToHash
}