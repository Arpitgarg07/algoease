import requests
import pandas as pd
from datetime import datetime


def get_historical_quotes(coin1, coin2, interval='daily'):
    """
    get historical quotes for a coin pair coin1/coin2 means that
    we get the price of coin1 in terms of coin2 .ie, price coin1/coin2
    """
    coin1_url = f'https://api.coingecko.com/api/v3/coins/{coin1}/market_chart/range'
    coin2_url = f'https://api.coingecko.com/api/v3/coins/{coin2}/market_chart/range'
    headers = {
        'Accepts': 'application/json',
    }

    current_timestamp = int(datetime.now().timestamp())
    if interval == 'minute':
        from_timestamp = current_timestamp - 60*60*24-1
    elif interval == 'hourly':
        from_timestamp = current_timestamp - 60*60*24*5-1
    else:
        from_timestamp = current_timestamp - 60*60*24*100-1

    parameters_coin1 = {
        'id': coin1,
        'to': current_timestamp,
        'from': from_timestamp,
        'vs_currency': 'usd',
        'x_cg_demo_api_key': 'CG-GhcnD1Suas8oabHstyxSf9gE'
    }

    parameters_coin2 = {
        'id': coin2,
        'to': current_timestamp,
        'from': from_timestamp,
        'vs_currency': 'usd',
        'x_cg_demo_api_key': 'CG-GhcnD1Suas8oabHstyxSf9gE'
    }
    try:
        coin1_response = requests.get(
            coin1_url, params=parameters_coin1, headers=headers)
        coin2_response = requests.get(
            coin2_url, params=parameters_coin2, headers=headers)
        if coin1_response.status_code == 200 and coin2_response.status_code == 200:
            coin1_data = coin1_response.json()['prices']
            coin2_data = coin2_response.json()['prices']
            result = [[coin1_data[i][0], coin1_data[i][1]/coin2_data[i][1]]
                      for i in range(len(coin1_data))]
            return result
        else:
            print(
                f"Request failed with status code: {coin1_response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"Request error: {e}")
        return None
