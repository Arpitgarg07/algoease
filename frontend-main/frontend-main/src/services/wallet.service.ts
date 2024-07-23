import axios from "./index.service";

export async function getHotWalletForUser(data: any) {
  return await axios.post("/users/hot-wallet", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getWalletBalances(data: any) {
  const url = `https://api.1inch.dev/balance/v1.2/${data.chainId}/balances/${data.walletAddress}`;

  const config = {
    headers: {
      Authorization: "Bearer llhqcEMyp7djpVMvngClIV9c9HlAXXZy",
    },
    params: {},
  };
  try {
    const response = await axios.get(url, config);
    console.log(response.data, "response.data from getWalletBalances");
  } catch (error) {
    console.log(error);
  }
}

export async function getTokenAddresses() {}
