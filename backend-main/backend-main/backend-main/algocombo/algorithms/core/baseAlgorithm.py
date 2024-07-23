from abc import ABC, abstractmethod


class BaseAlgorithm(ABC):
    _name = "Base Algorithm"
    _description = "Base algorithm class to extend for all algorithms"

    def __init__(self, inputs, timeframe='daily', name=None, description=None, * args, **kwargs):
        self._inputs = inputs
        self._timeframe = timeframe
        if name is not None:
            self._name = name
        if description is not None:
            self._description = description

    @property
    def name(self):
        return self._name

    @property
    def description(self):
        return self._description

    @property
    def inputs(self):
        return self._inputs

    @property
    def timeframe(self):
        return self._timeframe

    @abstractmethod
    def clean_data(self):
        raise NotImplementedError

    @abstractmethod
    def get_signal(self):
        raise NotImplementedError

    def __str__(self):
        return self._name

    def __repr__(self):
        return self._name
