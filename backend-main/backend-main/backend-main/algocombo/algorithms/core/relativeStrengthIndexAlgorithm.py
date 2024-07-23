from algorithms.core.baseAlgorithm import BaseAlgorithm
import pandas as pd


class RelativeStrengthIndexAlgorithm(BaseAlgorithm):
    _name = "Relative Strength Index Algorithm"
    _description = "Uses RSI to assess the momentum of an asset, indicating overbought or oversold conditions. It generates buy signals when RSI is low (indicating oversold) and sell signals when RSI is high (indicating overbought), helping traders anticipate trend reversals"

    def __init__(self, inputs, timeframe='daily', name=None, description=None, *args, **kwargs):
        super().__init__(inputs, timeframe, name, description, *args, **kwargs)

    def clean_data(self):
        df = pd.DataFrame(self._inputs, columns=['timestamp', 'price'])
        return df

    def get_signal(self, period=14, buy_threshold=30, sell_threshold=70, *args, **kwargs):
        """
        1=buy, 
        0=hold, 
        -1=sell

        @param period: int
        @param buy_threshold: int, the RSI threshold for generating a buy signal
        @param sell_threshold: int, the RSI threshold for generating a sell signal
        @return: int the buy/sell signal for the latest available day

        given day is the day before the required day to get the signal for
        """
        data = self.clean_data()
        data['Change'] = data['price'].diff()
        data['Gain'] = data['Change'].apply(lambda x: x if x > 0 else 0)
        data['Loss'] = data['Change'].apply(lambda x: abs(x) if x < 0 else 0)
        data['Avg_Gain'] = data['Gain'].rolling(
            window=period, min_periods=1).mean()
        data['Avg_Loss'] = data['Loss'].rolling(
            window=period, min_periods=1).mean()
        data['RS'] = data['Avg_Gain'] / data['Avg_Loss']
        data['RSI'] = 100 - (100 / (1 + data['RS']))

        # Extract the RSI for the latest available day
        rsi_latest_day = data.iloc[-1]['RSI']

        # Use the RSI from the latest available day to predict the signal
        signal_latest_day = 0  # Initialize the signal for the latest day

        if rsi_latest_day < buy_threshold:
            signal_latest_day = 1
        elif rsi_latest_day > sell_threshold:
            signal_latest_day = -1

        return signal_latest_day

    def __str__(self):
        return self._name

    def __repr__(self):
        return self._name
