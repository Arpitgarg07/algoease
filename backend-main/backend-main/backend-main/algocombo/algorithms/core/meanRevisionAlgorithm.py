from algorithms.core.baseAlgorithm import BaseAlgorithm
import pandas as pd


class MeanRevisionAlgorithm(BaseAlgorithm):
    _name = "Mean Revision Algorithm"
    _description = "Utilizes statistical measures like z-scores to identify buying or selling opportunities when asset prices deviate significantly from their historical mean. This strategy predicts price reversions to the mean, generating buy or sell signals based on price deviations"

    def __init__(self, inputs, timeframe='daily', name=None, description=None, *args, **kwargs):
        super().__init__(inputs, timeframe, name, description, *args, **kwargs)

    def clean_data(self):
        df = pd.DataFrame(self._inputs, columns=['timestamp', 'price'])
        return df

    def get_signal(self, window=20, buy_threshold=-1, sell_threshold=1):
        """
        Function to determine buy/sell signals based on Mean Reversion Strategy.

        @param data: pandas DataFrame containing historical price data
        @param window: int, window size for calculating mean
        @param buy_threshold: float, threshold for generating a buy signal
        @param sell_threshold: float, threshold for generating a sell signal
        @return: int, buy (1), sell (-1), or hold (0) signal
        """
        data = self.clean_data()
        # Calculate the rolling mean
        rolling_mean = data['price'].rolling(window=window).mean()

        # Calculate the z-score to measure the deviation from the mean
        z_score = (data['price'] - rolling_mean) / \
            data['price'].rolling(window=window).std()

        # Generate buy/sell signals based on z-score thresholds
        signal = 0  # Initialize the signal as hold

        if z_score.iloc[-1] < buy_threshold:
            signal = 1  # Buy signal
        elif z_score.iloc[-1] > sell_threshold:
            signal = -1  # Sell signal

        return signal

    def __str__(self):
        return self._name

    def __repr__(self):
        return self._name
