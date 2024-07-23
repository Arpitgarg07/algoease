import { create } from "zustand";

export const useTradeStore = create((set) => ({
  currentToken: null,
  setCurrentToken: (token: any) => set({ currentToken: token }),
  tokenList: [],
  setTokens: (tokens: any) => set({ tokenList: tokens }),
  amount: 0,
  setAmount: (amount: number) => set({ amount: amount }),
  executionLayer: null,
  setExecutionLayer: (layer: any) => set({ executionLayer: layer }),
  algorithm: null,
  setAlgorithm: (algorithm: any) => set({ algorithm: algorithm }),
  tvParam: "ETH/USDT",
  setTvParam: (tvParam: any) => set({ tvParam }),
}));
