// Private key: c8db810babc75612363ca0b89595e01723c956a3134d4b61048a812ca6c4ecb0
// Public key: 533a47df070d90760913a7b21f23d2c853b1b980

// Private key: 3589cef60fdd0f9598cfe568f3a7360874a15a363dc4837058bec496f7451dd5
// Public key: da240a2aa52539bdb1ae6249176875f16a3a50f6

// Private key: 73917e4bce40686f7bfc66a9dc74f51d594a113aa88895922d2037c9f5c2932b
// Public key: d2effa7c47258add63a2b5b932b649e1fa078d54

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("Private key: " + toHex(privateKey));

const publicKey = keccak256(secp.secp256k1.getPublicKey(privateKey).slice(1)).slice(-20);

console.log("Public key: " + toHex(publicKey));
