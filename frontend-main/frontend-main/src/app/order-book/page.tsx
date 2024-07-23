"use client";
import React, { use, useEffect, useState } from "react";
import "./index.css";
import IOrder from "@/types/order.interface";
import { getIconUrl } from "@/utils";
import { getActiveTrades } from "@/services/trade.service";
import { getAccount } from "@/configs/wallet_config";
import { useWalletClient } from "wagmi";

export default function OrderBook() {
  const [orderBook, setOrderBook] = useState<IOrder[]>([]);
  const { data: walletClient } = useWalletClient();

  // useEffect(() => {
  //   if (!walletClient) return;
  //   const interval = setInterval(() => {
  //     handleFetchOrderBook();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, [orderBook, walletClient]);

  useEffect(() => {
    // if (!walletClient) return;
    // handleFetchOrderBook();
    setOrderBook([
      {
        earliest: {
          _id: 1,
          earliestTrade: {
            _id: "657448744c993d038ff91d74",
            current_coin: "matic",
            coin_pairs: ["matic", "usdt"],
            amount: 10,
            isActive: true,
            creator: {
              wallet_address: "0x7CC6E56d37eA31A31d0d59E41728bb034203C6DB",
              hot_wallet_public_key: "0xpublic2",
              hot_wallet_private_key: "0xprivate2",
              createdAt: "2023-12-09T10:19:56.802Z",
              _id: "65743f4cdabeefc22539f288",
              __v: 0,
            },
            createdAt: "2023-12-09T10:59:00.790Z",
            trade_id: 1,
          },
        },
        latest: {
          _id: 1,
          latestTrade: {
            _id: "6574490fa92f39b6d041a839",
            trade_id: 1,
            current_coin: "matic",
            coin_pairs: ["matic", "usdt"],
            amount: 10,
            isActive: true,
            creator: {
              wallet_address: "0x7CC6E56d37eA31A31d0d59E41728bb034203C6DB",
              hot_wallet_public_key: "0xpublic2",
              hot_wallet_private_key: "0xprivate2",
              createdAt: "2023-12-09T10:19:56.802Z",
              _id: "65743f4cdabeefc22539f288",
              __v: 0,
            },
            createdAt: "2023-12-09T11:01:35.178Z",
          },
        },
      },
    ]);
  }, []);

  const handleFetchOrderBook = async () => {
    const [address] = await walletClient!.getAddresses();
    console.log(address, "ACCOUNT");
    if (!address) return;
    const res = await getActiveTrades({
      wallet_address: address,
    });
    console.log(res, "RES");
    if (!res.data) return;
    setOrderBook(res.data.data);
  };

  return (
    <div className="order-book">
      <h1>Order book</h1>
      <div className="w-full px-10 rounded-lg">
        <table className="table w-full px-10 text-2xl border border-separate text-center border-1 border-slate-600 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th>Assets</th>
              <th>Amount invested(in $)</th>
              <th>Current Value(in $)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderBook.length === 0 ? (
              <tr>
                <td colSpan={4}>No active trades</td>
              </tr>
            ) : (
              orderBook.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex flex-row items-center text-center w-full justify-center uppercase">
                        <img
                          src={getIconUrl(
                            order.earliest.earliestTrade.current_coin
                          )}
                          className="w-5 h-5 m-1"
                        />
                        {order.earliest.earliestTrade.current_coin} -
                        <img
                          src={getIconUrl(
                            order.earliest.earliestTrade.coin_pairs[1]
                          )}
                          className="w-5 h-5 m-1"
                        />
                        {order.earliest.earliestTrade.coin_pairs[1]}
                      </div>
                    </td>
                    <td>{order.earliest.earliestTrade.amount}</td>
                    <td>{order.latest.latestTrade.amount}</td>
                    <td>
                      <div className="badge badge-accent badge-outline uppercase">
                        Active
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
