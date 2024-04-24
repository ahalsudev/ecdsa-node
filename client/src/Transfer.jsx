import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { useState } from "react";
import server from "./server";

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    try {
      setAddress(toHex(keccak256(secp256k1.getPublicKey(privateKey).slice(1)).slice(-20)));
      if (address != "") {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
        });
        setBalance(balance);
      }

    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
