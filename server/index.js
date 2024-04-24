const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

// Private key: c8db810babc75612363ca0b89595e01723c956a3134d4b61048a812ca6c4ecb0
// Public key: 533a47df070d90760913a7b21f23d2c853b1b980

// Private key: 3589cef60fdd0f9598cfe568f3a7360874a15a363dc4837058bec496f7451dd5
// Public key: da240a2aa52539bdb1ae6249176875f16a3a50f6

// Private key: 73917e4bce40686f7bfc66a9dc74f51d594a113aa88895922d2037c9f5c2932b
// Public key: d2effa7c47258add63a2b5b932b649e1fa078d54

const balances = {
  "533a47df070d90760913a7b21f23d2c853b1b980": 100,
  "da240a2aa52539bdb1ae6249176875f16a3a50f6": 50,
  "d2effa7c47258add63a2b5b932b649e1fa078d54": 75,
};

app.get("/balance/:key", (req, res) => {

  const { key } = req.params;

  const address = toHex(keccak256(secp.secp256k1.getPublicKey(key).slice(1)).slice(-20));
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
