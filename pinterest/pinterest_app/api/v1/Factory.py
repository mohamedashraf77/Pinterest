from pinterest_app.models import Board, User, Pin
from . import serializers as ser

class PinterestFactory:
    def __init__(self, model):
        self.model = self.get_model(model)

    def get_model(self, model):
        if model == 'board':
            return Board.objects
        elif model == 'pin':
            return Pin.objects

    def get_serialzer(self, model, **kwargs):
        if model == 'board':
            ser.PinteresrSerializer.Meta.model = Board
        elif model == 'pin':
            ser.PinteresrSerializer.Meta.model = Pin

        return ser.PinteresrSerializer(**kwargs)