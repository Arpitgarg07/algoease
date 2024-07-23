"use client";
import React, { useEffect } from "react";
import "./index.css";
import { Web3Button, Web3Modal } from "@web3modal/react";
import ConnectWallet from "@/components/ConnectWallet";
import { useTheme } from "next-themes";
import { getAccount } from "@/configs/wallet_config";
import { useRouter } from "next/navigation";
import { useAccount, useWalletClient } from "wagmi";
import { useWalletStore } from "@/states/wallet.state";

export default function Home() {
  const router = useRouter();
  const setAddress = useWalletStore((state: any) => state.setAddress);
  const { data: walletClient } = useWalletClient();

  return (
    <div className="home">
      <div className="hero">
        <div>
          <h1>AlgoEase</h1>
          <div className="sentence">
            <span>Automate</span>
            <div className="words rotate">
              <span>Money Making</span>
              <span>Trades</span>
              <span>Alerts</span>
            </div>
            <br />
          </div>
          <button
            className="start-btn"
            onClick={() => {
              // handleSendSignature();
              router.push("/trade");
            }}
          >
            Start Trading
          </button>
          <h2>Your trade, our strategies.</h2>
        </div>
        <img
          src="/assets/trading.png"
          alt="hero"
          style={{
            width: "100%",
            maxWidth: "650px",
            height: "auto",
            // marginTop: "50px",
          }}
        />
      </div>
    </div>
  );
}
