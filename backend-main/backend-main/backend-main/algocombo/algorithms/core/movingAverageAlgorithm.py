from algorithms.core.baseAlgorithm import BaseAlgorithm
import pandas as pd


class MovingAverageAlgorithm(BaseAlgorithm):
    _name = "Moving Average Algorithm"
    _description = "Analyzes short-term and long-term moving averages to determine market trends. It generates buy signals when short-term averages cross above long-term averages and sell signals when the opposite occurs, aiding in identifying potential entry and exit points"

    def __init__(self, inputs, timeframe='daily', name=None, description=None, *args, **kwargs):
        super().__init__(inputs, timeframe, name, description, *args, **kwargs)

    def clean_data(self):
        df = pd.DataFrame(self._inputs, columns=['timestamp', 'price'])
        return df

    def get_signal(self, short_window=20, long_window=50, *args, **kwargs):
        """
        1=buy, 
        0=hold, 
        -1=sell

        @param short_window: int
        @param long_window: int
        @return: int the buy/sell signal for the latest available day
        """
        data = self.clean_data()
        data['Short_MA'] = data['price'].rolling(
            window=short_window, min_periods=1).mean()
        data['Long_MA'] = data['price'].rolling(
            window=long_window, min_periods=1).mean()

        # Generate buy/sell signals based on crossover for the latest day
        signal_latest_day = 0  # Initialize the signal for the latest day

        if data['Short_MA'].iloc[-1] > data['Long_MA'].iloc[-1]:
            signal_latest_day = 1  # Buy signal
        elif data['Short_MA'].iloc[-1] < data['Long_MA'].iloc[-1]:
            signal_latest_day = -1  # Sell signal

        return signal_latest_day

    def __str__(self):
        return self._name

    def __repr__(self):
        return self._name
