import { create } from "zustand";

export const useWalletStore = create((set) => ({
  wAddress: null,
  setAddress: (address: string) => set({ wAddress: address }),
}));
