import server from "./server";

function Wallet({ privateKey, setKey, balance, setBalance }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setKey(privateKey);
    if (privateKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${privateKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Key
        <input placeholder="Type an key, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
