import ITrade from "@/types/trade.interface";
import axios from "./index.service";

export async function createTrade(data: ITrade) {
  return await axios.post("/trades", data);
}

export async function getActiveTrades(data: any) {
  return await axios.post("/trades/active-trades", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
