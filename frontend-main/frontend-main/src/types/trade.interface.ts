export default interface ITrade {
  trade: {
    current_coin: string;
    coin_pairs: string[];
    amount: number;
    algorithm: string;
    execution_type: string;
    chain_id: number;
  };
  signature: string;
  wallet_address: string;
  message: string;
}
