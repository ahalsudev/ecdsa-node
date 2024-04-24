import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [key, setKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={key}
        setKey={setKey}
      />
      <Transfer setBalance={setBalance} privateKey={key} />
    </div>
  );
}

export default App;
