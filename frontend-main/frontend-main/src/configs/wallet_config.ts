"use client";
import { createWalletClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet, polygon } from "viem/chains";
import { useWalletClient } from "wagmi";

export async function getAccount() {
  //   const { data: walletClient } = useWalletClient();
  //   const [account] = await walletClient!.getAddresses();
  return "";
}
