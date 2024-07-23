export default interface IOrder {
  earliest: {
    _id: number;
    earliestTrade: {
      _id: string;
      current_coin: string;
      coin_pairs: string[];
      amount: number;
      isActive: boolean;
      creator: any;
      createdAt: string;
      trade_id: number;
    };
  };
  latest: {
    _id: number;
    latestTrade: {
      _id: string;
      current_coin: string;
      coin_pairs: string[];
      amount: number;
      isActive: boolean;
      creator: any;
      createdAt: string;
      trade_id: number;
    };
  };
}
