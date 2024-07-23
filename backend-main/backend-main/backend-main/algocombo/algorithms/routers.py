from typing import List, Union
from fastapi import APIRouter, Body, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from utils.getHistoricalData import get_historical_quotes
from algorithms.core.movingAverageAlgorithm import MovingAverageAlgorithm
from algorithms.core.relativeStrengthIndexAlgorithm import RelativeStrengthIndexAlgorithm
from algorithms.core.meanRevisionAlgorithm import MeanRevisionAlgorithm

router = APIRouter()


class get_signal_request(BaseModel):
    coin1: str
    coin2: str
    timeframe: str = "daily"
    args: List = []
    kwargs: dict = {}


@router.post("/get_signal/{algorithm_name}", tags=["algorithms"])
def get_signal(algorithm_name: str, request_body: get_signal_request = Body(...)):
    """
    Get the signal for the given algorithm
    """
    input_data = get_historical_quotes(
        request_body.coin1, request_body.coin2, request_body.timeframe, *request_body.args, **request_body.kwargs)
    algorithm_object = None

    if algorithm_name == "MovingAverageAlgorithm":
        algorithm_object = MovingAverageAlgorithm(
            input_data, request_body.timeframe)
    elif algorithm_name == "RelativeStrengthIndexAlgorithm":
        algorithm_object = RelativeStrengthIndexAlgorithm(
            input_data, request_body.timeframe)
    elif algorithm_name == "MeanRevisionAlgorithm":
        algorithm_object = MeanRevisionAlgorithm(
            input_data, request_body.timeframe)
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": "Invalid algorithm name"})

    signal = algorithm_object.get_signal(
        *request_body.args, **request_body.kwargs)
    name = algorithm_object.name
    description = algorithm_object.description

    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Signal retreived successfully", "signal": signal})
