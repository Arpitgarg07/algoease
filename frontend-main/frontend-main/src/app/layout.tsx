"use client";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import React, { useEffect } from "react";
import {
  configureChains,
  createConfig,
  useWalletClient,
  WagmiConfig,
} from "wagmi";
import {
  arbitrum,
  mainnet,
  polygon,
  goerli,
  polygonMumbai,
} from "wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import ConnectWallet from "@/components/ConnectWallet";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "./theme.provider";
import { useTheme } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chains = [goerli, polygonMumbai, arbitrum, mainnet, polygon];
  const projectId = "dd0d6065610301cf7f8d51557cbbffc3";
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("theme-options");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("theme-options");
    }
  }, [theme]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
          {/* <ConnectWallet /> */}
          <Navbar />
          <Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
            themeVariables={{
              "--w3m-accent-color": "#0b40a1",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
