import React from "react";
import { Web3Button } from "@web3modal/react";
import "./index.css";

export default function ConnectWallet() {
  return (
    <div className="wallet-button">
      <Web3Button />
    </div>
  );
}
