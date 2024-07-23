import React, { useEffect, useRef } from "react";
import "./index.css";
import ConnectWallet from "../ConnectWallet";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useTheme } from "next-themes";
import {
  getHotWalletForUser,
  getWalletBalances,
} from "@/services/wallet.service";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { useWalletStore } from "@/states/wallet.state";
import { getAccount } from "@/configs/wallet_config";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { theme } = useTheme();

  const wAddress = useWalletStore((state: any) => state.address);
  const [depositOpen, setDepositOpen] = React.useState(false);
  const [hotAddress, setHotAddress] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    if (wAddress) {
      handleFetchHotWalletData();
    }
  }, []);

  React.useEffect(() => {
    if (wAddress) {
      handleFetchHotWalletData();
    }
  }, [wAddress]);

  const modal2 = useRef<any>(null);

  const handleFetchHotWalletData = async () => {
    if (!wAddress) {
      return;
    }
    console.log("address", wAddress);
    const res = await getHotWalletForUser({
      wallet_address: wAddress,
    });
    if (res.data) {
      setHotAddress(res.data.hot_wallet_address);
    }
    handleFetchWalletBalances(wAddress);
    console.log("res from hot wallet fetch", res);
  };

  const handleSendFundsToHotWallet = async () => {};

  const handleFetchWalletBalances = async (addr: string) => {
    const chainId = useChainId();
    const res = await getWalletBalances({
      chainId,
      wallet_address: addr,
    });
    console.log("res from 1 inch", res);
  };

  const handleClose = () => {
    setDepositOpen(false);
    modal2.current!.close();
  };

  return (
    <div className="navbar">
      <h1>AlgoEase</h1>
      <div className="nav-links">
        <a href="/home">Home</a>
        <a href="/trade">Trade</a>
        <a href="/order-book">Order book</a>
        <a href="#" onClick={() => modal2.current!.showModal()}>
          Vault
        </a>
      </div>
      <ConnectWallet />
      <dialog ref={modal2} id="my_modal_2" className="modal theme-options">
        <div
          className={`modal-box ${theme === "dark" ? "bg-white" : "bg-black"}`}
        >
          <div className="mt-4 rounded-xl p-2 overflow-y-auto">
            {depositOpen ? (
              <div className="deposit-ui">
                <h2>
                  To top up your vault, deposit the tokens to the below address.
                </h2>
                <div className="deposit-address-chip">
                  {"0x9c0e4d20e2201c6396f32ecac7ce39b4dbccc878"}
                </div>
                <h2>
                  You can proceed with the trades once the deposit is complete
                </h2>
              </div>
            ) : (
              <div className="vault-card-ui">
                <div className="vault-balance">
                  <div className="balance-label">Balance:</div>
                  <div className="balance-amount">$165.00</div>
                </div>
                <div className="vault-address">
                  <div className="address">0x123...456</div>
                  <div className="brand">at AlgoEase</div>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center items-center">
              <button
                className="deposit-btn"
                onClick={() => {
                  depositOpen ? handleClose() : setDepositOpen(true);
                }}
              >
                {depositOpen ? "Done" : "Deposit"}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
